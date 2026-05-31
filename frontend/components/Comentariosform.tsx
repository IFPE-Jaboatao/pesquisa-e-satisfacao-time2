'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function Comentariosform() {
  const router = useRouter();
  const [answers, setAnswers] = useState({

    comentario: "",
    gosta: "",
    melhorar: "",
    sugestao: "",
    recomendaria: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  }

  async function handleSubmit() {
  try {
    const inicio = JSON.parse(localStorage.getItem("inicio") || "{}");
    const infraestrutura = JSON.parse(localStorage.getItem("infraestrutura") || "{}");
    const seguranca = JSON.parse(localStorage.getItem("seguranca") || "{}");
    const bibliotecaAtendimento = JSON.parse(
      localStorage.getItem("bibliotecaAtendimento") || "{}",
    );
    const limpeza = JSON.parse(localStorage.getItem("limpeza") || "{}");

    const payload = {
      surveyId: 2,
      respondentToken: crypto.randomUUID(),
      course: inicio.curso,
      period: inicio.periodo,
      shift: inicio.turno,
      semester: inicio.semestre,
      campus: inicio.campus,
      finalComment: `${answers.gosta} | ${answers.melhorar} | ${answers.sugestao}`,
      wouldRecommend: answers.recomendaria === "Sim",
      items: [
        // Infraestrutura
        { questionId: 29, ratingValue: infraestrutura.qualidade },
        {
          questionId: 30,
          selectedOption:
            infraestrutura.laboratorios === "Sim"
              ? "SIM"
              : infraestrutura.laboratorios === "Não"
                ? "NAO"
                : "NAO_SE_APLICA",
        },,
        { questionId: 31, ratingValue: infraestrutura.wifi },
        { questionId: 32, ratingValue: infraestrutura.convivencia },
        { questionId: 33, ratingValue: infraestrutura.acessibilidade },

        // Segurança
        { questionId: 34, ratingValue: seguranca.seguranca },
        { questionId: 35, ratingValue: seguranca.acesso },
        { questionId: 36, ratingValue: seguranca.iluminacao },
        { questionId: 37, ratingValue: seguranca.segurancaNoturna },

        // Biblioteca e Atendimento
        { questionId: 38, ratingValue: bibliotecaAtendimento.acervo },
        { questionId: 39, ratingValue: bibliotecaAtendimento.espaco },
        { questionId: 40, ratingValue: bibliotecaAtendimento.secretaria },
        { questionId: 41, ratingValue: bibliotecaAtendimento.temporesposta },

        // Limpeza
        { questionId: 42, ratingValue: limpeza.salas },
        { questionId: 43, ratingValue: limpeza.banheiros },
        { questionId: 44, textAnswer: limpeza.comentario },

        // Comentários finais
        { questionId: 45, textAnswer: answers.gosta },
        { questionId: 46, textAnswer: answers.melhorar },
        { questionId: 47, textAnswer: answers.sugestao },
        {
          questionId: 48,
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

    localStorage.clear();
    router.push("/sucesso");
  } catch (error) {
    alert(error instanceof Error ? error.message : "Erro ao enviar resposta");
  }
}

  return (
    <div className="bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-1 rounded-full"
        >
          Voltar
        </button>
        <span className="text-black text-sm font-semibold">Etapa 5 de 5</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
        <div className="bg-blue-600 h-3 rounded-full w-[100%]" />
      </div>
      

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
          <p>4. Você recomendaria a instituição?</p>
          <div className="mt-1 space-y-1">
            {["Sim", "Talvez", "Não"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="recomendaria"
                  aria-label={`Você recomendaria a instituição: ${opt}`}
                  value={opt}
                  onChange={handleChange}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>

       


      {/* Botão */}
      <button  onClick={handleSubmit} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
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



