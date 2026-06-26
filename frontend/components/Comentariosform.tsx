"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import ProgressBar from "@/components/ProgressBar";

type Question = {
  id: number;
  step: number;
  order: number;
  title: string;
};

function getQuestionId(step: number, order: number) {
  const survey = JSON.parse(localStorage.getItem("survey") || "{}");
  const questions: Question[] = survey.questions || [];

  const question = questions.find(
    (item) => item.step === step && item.order === order,
  );

  if (!question) {
    throw new Error(
      `Pergunta não encontrada na etapa ${step}, ordem ${order}.`,
    );
  }

  return question.id;
}

export default function Comentariosform() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    comentario: "",
    gosta: "",
    melhorar: "",
    sugestao: "",
    recomendaria: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  }

  async function handleSubmit() {
    try {
      const inicio = JSON.parse(localStorage.getItem("inicio") || "{}");
      const infraestrutura = JSON.parse(
        localStorage.getItem("infraestrutura") || "{}",
      );
      const seguranca = JSON.parse(localStorage.getItem("seguranca") || "{}");
      const bibliotecaAtendimento = JSON.parse(
        localStorage.getItem("bibliotecaAtendimento") || "{}",
      );
      const limpeza = JSON.parse(localStorage.getItem("limpeza") || "{}");

      const surveyId = Number(localStorage.getItem("surveyId"));

      if (!surveyId) {
        alert("Pesquisa não encontrada. Volte para a tela inicial.");
        return;
      }

      let respondentToken = localStorage.getItem("respondentToken");

      if (!respondentToken) {
        respondentToken = crypto.randomUUID();
        localStorage.setItem("respondentToken", respondentToken);
      }

      const payload = {
        surveyId,
        respondentToken,
        course: inicio.curso,
        period: inicio.periodo,
        shift: inicio.turno,
        semester: inicio.semestre,
        campus: inicio.campus,
        finalComment: `${answers.gosta} | ${answers.melhorar} | ${answers.sugestao}`,
        wouldRecommend: answers.recomendaria === "Sim",
        items: [
          {
            questionId: getQuestionId(1, 1),
            ratingValue: infraestrutura.qualidade,
          },
          {
            questionId: getQuestionId(1, 2),
            selectedOption:
              infraestrutura.laboratorios === "Sim"
                ? "SIM"
                : infraestrutura.laboratorios === "Não"
                  ? "NAO"
                  : "NAO_SE_APLICA",
          },
          { questionId: getQuestionId(1, 3), ratingValue: infraestrutura.wifi },
          {
            questionId: getQuestionId(1, 4),
            ratingValue: infraestrutura.convivencia,
          },
          {
            questionId: getQuestionId(1, 5),
            ratingValue: infraestrutura.acessibilidade,
          },

          { questionId: getQuestionId(2, 1), ratingValue: seguranca.seguranca },
          { questionId: getQuestionId(2, 2), ratingValue: seguranca.acesso },
          {
            questionId: getQuestionId(2, 3),
            ratingValue: seguranca.iluminacao,
          },
          {
            questionId: getQuestionId(2, 4),
            ratingValue: seguranca.segurancaNoturna,
          },

          {
            questionId: getQuestionId(3, 1),
            ratingValue: bibliotecaAtendimento.acervo,
          },
          {
            questionId: getQuestionId(3, 2),
            ratingValue: bibliotecaAtendimento.espaco,
          },
          {
            questionId: getQuestionId(3, 3),
            ratingValue: bibliotecaAtendimento.secretaria,
          },
          {
            questionId: getQuestionId(3, 4),
            ratingValue: bibliotecaAtendimento.temporesposta,
          },

          { questionId: getQuestionId(4, 1), ratingValue: limpeza.salas },
          { questionId: getQuestionId(4, 2), ratingValue: limpeza.banheiros },
          { questionId: getQuestionId(4, 3), textAnswer: limpeza.comentario },

          { questionId: getQuestionId(5, 1), textAnswer: answers.gosta },
          { questionId: getQuestionId(5, 2), textAnswer: answers.melhorar },
          { questionId: getQuestionId(5, 3), textAnswer: answers.sugestao },
          {
            questionId: getQuestionId(5, 4),
            selectedOption:
              answers.recomendaria === "Sim"
                ? "SIM"
                : answers.recomendaria === "Talvez"
                  ? "TALVEZ"
                  : "NAO",
          },
        ],
      };

      await apiFetch("/responses", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // Limpa apenas os dados da pesquisa
      localStorage.removeItem("inicio");
      localStorage.removeItem("infraestrutura");
      localStorage.removeItem("seguranca");
      localStorage.removeItem("bibliotecaAtendimento");
      localStorage.removeItem("limpeza");
      localStorage.removeItem("survey");
      localStorage.removeItem("surveyId");

      // Mantém respondentToken para bloquear duplicidade

      router.push("/sucesso");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao enviar resposta");
    }
  }

  return (
    <div className="bg-white border border-[#9BDDE5] p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-[#0B74DE] text-white px-4 py-1 rounded-full"
        >
          Voltar
        </button>
      </div>

      {/* Barra de progresso */}
      <ProgressBar step={5} total={5} />

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <div>
          <p>1. O que você mais gosta na universidade?</p>
          <textarea
            name="gosta"
            placeholder="O que você mais gosta na universidade?"
            value={answers.gosta}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 mt-1"
          />
        </div>

        <div>
          <p>2. O que precisa ser melhorado?</p>
          <textarea
            name="melhorar"
            placeholder="O que precisa ser melhorado?"
            value={answers.melhorar}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 mt-1"
          />
        </div>

        <div>
          <p>3. Deixe uma sugestão adicional</p>
          <textarea
            name="sugestao"
            placeholder="Deixe uma sugestão adicional"
            value={answers.sugestao}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 mt-1"
          />
        </div>

        <div>
          <p className="font-semibold mb-2">
            4. Você recomendaria a instituição?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                value: "Sim",
                title: "Sim",
                description: "Com certeza recomendaria",
              },
              {
                value: "Talvez",
                title: "Talvez",
                description: "Não tenho certeza",
              },
              { value: "Não", title: "Não", description: "Não recomendaria" },
            ].map((option) => {
              const selected = answers.recomendaria === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setAnswers({
                      ...answers,
                      recomendaria: option.value,
                    })
                  }
                  className={`
            rounded-xl border p-3 text-left transition
            ${
              selected
                ? "border-blue-700 bg-blue-100 shadow-md"
                : "border-gray-300 bg-white hover:border-blue-500"
            }
          `}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`
                mt-1 h-4 w-4 rounded-full border
                ${
                  selected
                    ? "border-blue-700 bg-blue-700"
                    : "border-gray-400 bg-white"
                }
              `}
                    />

                    <div>
                      <p className="font-semibold text-gray-900">
                        {option.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botão */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-[#0B74DE] text-white py-2 rounded-full hover:bg-[#075FB5]"
      >
        Próxima
      </button>

      {/* Rodapé */}
      <p className="text-black text-center text-xs mt-4">
        Sua participação é anônima. <br />
        Nenhuma informação pessoal será coletada.
      </p>
    </div>
  );
}
