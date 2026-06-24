"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

type ResponseItem = {
  id: number;
  surveyId: number;
  course?: string;
  campus?: string;
  createdAt: string;
  survey?: {
    title: string;
  };
};

export default function RespostasPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  async function loadResponses() {
    try {
      const data = await apiFetch("/responses");
      setResponses(data);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao carregar respostas.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Deseja realmente excluir esta resposta?");
    if (!confirmDelete) return;

    try {
      await apiFetch(`/responses/${id}`, {
        method: "DELETE",
      });

      setResponses((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao excluir resposta.",
      );
    }
  }

  useEffect(() => {
    loadResponses();
  }, []);

  const filteredResponses = responses.filter((response) => {
    const matchCurso = curso ? response.course === curso : true;
    const matchPesquisa = pesquisa
      ? String(response.surveyId) === pesquisa
      : true;

    return matchCurso && matchPesquisa;
  });

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#111827]">Respostas</h2>
        <p className="text-sm text-gray-600">
          Consulte todas as respostas recebidas
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <select
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="p-2 border border-[#9BDDE5] rounded-lg text-sm"
        >
          <option value="">Todas as pesquisas</option>
          <option value="2">Pesquisa de Satisfação 2026.1</option>
        </select>

        <select
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
          className="p-2 border border-[#9BDDE5] rounded-lg text-sm"
        >
          <option value="">Todos os cursos</option>
          <option value="ADS">ADS</option>
          <option value="Engenharia">Engenharia</option>
        </select>
      </div>

      <div className="bg-white border border-[#9BDDE5] rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#EAF7FA] text-[#111827]">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Pesquisa</th>
              <th className="p-3 text-left">Campus</th>
              <th className="p-3 text-left">Curso</th>
              <th className="p-3 text-left">Data/Hora</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Carregando respostas...
                </td>
              </tr>
            ) : filteredResponses.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Nenhuma resposta encontrada.
                </td>
              </tr>
            ) : (
              filteredResponses.map((response) => (
                <tr key={response.id} className="border-t">
                  <td className="p-3">{response.id}</td>
                  <td className="p-3">
                    {response.survey?.title || `Pesquisa ${response.surveyId}`}
                  </td>
                  <td className="p-3">{response.campus || "-"}</td>
                  <td className="p-3">{response.course || "-"}</td>
                  <td className="p-3">{formatDateTime(response.createdAt)}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        title="Visualizar"
                        onClick={() => router.push(`/admin/respostas/${response.id}`)}
                        className="text-blue-600"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        title="Excluir"
                        onClick={() => handleDelete(response.id)}
                        className="text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("pt-BR");
}
