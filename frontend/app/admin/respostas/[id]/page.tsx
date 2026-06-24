"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ResponseDetail = {
  id: number;
  surveyId: number;
  course?: string;
  campus?: string;
  period?: string;
  shift?: string;
  semester?: string;
  finalComment?: string;
  wouldRecommend?: boolean;
  createdAt: string;
  survey?: {
    title: string;
  };
  items?: {
    id: number;
    questionId: number;
    ratingValue?: number;
    selectedOption?: string;
    textAnswer?: string;
    question?: {
      title: string;
    };
  }[];
};

export default function VisualizarRespostaPage() {
  const { id } = useParams();
  const router = useRouter();

  const [response, setResponse] = useState<ResponseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResponse() {
      try {
        const data = await apiFetch(`/responses/${id}`);
        setResponse(data);
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Erro ao carregar resposta.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadResponse();
  }, [id]);

  if (loading) {
    return <p>Carregando resposta...</p>;
  }

  if (!response) {
    return <p>Resposta não encontrada.</p>;
  }

  return (
    <div className="bg-white border border-[#9BDDE5] rounded-xl shadow p-6">
      <button
        onClick={() => router.push("/admin/respostas")}
        className="mb-4 bg-[#0B74DE] text-white px-4 py-2 rounded-lg text-sm"
      >
        Voltar
      </button>

      <h2 className="text-xl font-bold text-[#111827] mb-2">
        Detalhes da Resposta #{response.id}
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        {response.survey?.title || `Pesquisa ${response.surveyId}`}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
        <p><strong>Campus:</strong> {response.campus || "-"}</p>
        <p><strong>Curso:</strong> {response.course || "-"}</p>
        <p><strong>Período:</strong> {response.period || "-"}</p>
        <p><strong>Turno:</strong> {response.shift || "-"}</p>
        <p><strong>Semestre:</strong> {response.semester || "-"}</p>
        <p><strong>Data/Hora:</strong> {formatDateTime(response.createdAt)}</p>
        <p>
          <strong>Recomendaria:</strong>{" "}
          {response.wouldRecommend ? "Sim" : "Não"}
        </p>
      </div>

      <h3 className="font-bold text-[#111827] mb-3">Respostas das perguntas</h3>

      <div className="space-y-3">
        {response.items && response.items.length > 0 ? (
          response.items.map((item) => (
            <div
              key={item.id}
              className="border border-[#9BDDE5] rounded-lg p-3 bg-[#F8FEFF]"
            >
              <p className="font-semibold">
                {item.question?.title || `Pergunta ${item.questionId}`}
              </p>

              <p className="text-sm text-gray-700 mt-1">
                <strong>Resposta:</strong>{" "}
                {item.ratingValue ??
                  item.selectedOption ??
                  item.textAnswer ??
                  "-"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">
            Nenhum item de resposta encontrado.
          </p>
        )}
      </div>

      {response.finalComment && (
        <div className="mt-6 border border-[#9BDDE5] rounded-lg p-3">
          <p className="font-semibold">Comentário final</p>
          <p className="text-sm text-gray-700 mt-1">{response.finalComment}</p>
        </div>
      )}
    </div>
  );
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("pt-BR");
}