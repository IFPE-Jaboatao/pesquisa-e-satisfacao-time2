"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import { apiFetch } from "@/lib/api";

type Survey = {
  id: number;
  title: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export default function PesquisasPage() {
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadSurveys() {
    try {
      const data = await apiFetch("/surveys");
      setSurveys(data);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao buscar pesquisas.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm("Deseja realmente excluir esta pesquisa?");

    if (!confirmDelete) return;

    try {
      await apiFetch(`/surveys/${id}`, {
        method: "DELETE",
      });

      setSurveys((prev) => prev.filter((survey) => survey.id !== id));

      alert("Pesquisa excluída com sucesso!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao excluir pesquisa.",
      );
    }
  }

  useEffect(() => {
    loadSurveys();
  }, []);

  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Pesquisas</h2>
          <p className="text-sm text-gray-600">
            Veja todas as pesquisas cadastradas
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar Pesquisa..."
              className="w-full md:w-64 pl-9 pr-3 py-2 border border-[#9BDDE5] rounded-lg text-sm"
            />
          </div>

          <button
            onClick={() => router.push("/admin/pesquisas/criar")}
            className="bg-[#0B74DE] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#075FB5]"
          >
            Criar Pesquisa
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#9BDDE5] rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#EAF7FA] text-[#111827]">
            <tr>
              <th className="p-3 text-left">Nome da Pesquisa</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Período</th>
              <th className="p-3 text-left">Data da criação</th>
              <th className="p-3 text-center">Respostas</th>
              <th className="p-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Carregando pesquisas...
                </td>
              </tr>
            ) : filteredSurveys.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Nenhuma pesquisa encontrada.
                </td>
              </tr>
            ) : (
              filteredSurveys.map((survey) => {
                const status = getSurveyStatus(survey);

                return (
                  <tr key={survey.id} className="border-t">
                    <td className="p-3">{survey.title}</td>

                    <td className="p-3">
                      <span className={getStatusClass(status)}>
                        {status}
                      </span>
                    </td>

                    <td className="p-3">
                      {formatDate(survey.startDate)} -{" "}
                      {formatDate(survey.endDate)}
                    </td>

                    <td className="p-3">{formatDate(survey.createdAt)}</td>

                    <td className="p-3 text-center">0</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-3">
                        <button
                          title="Visualizar"
                          onClick={() =>
                            router.push(`/admin/pesquisas/${survey.id}`)
                          }
                        >
                          <Eye size={18} className="text-blue-600" />
                        </button>

                        <button
                          title="Editar"
                          onClick={() =>
                            router.push(`/admin/pesquisas/editar/${survey.id}`)
                          }
                        >
                          <Pencil size={18} className="text-blue-600" />
                        </button>

                        <button
                          title="Excluir"
                          onClick={() => handleDelete(survey.id)}
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

function getSurveyStatus(survey: Survey) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(survey.startDate);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(survey.endDate);
  endDate.setHours(0, 0, 0, 0);

  if (today < startDate) {
    return "Agendada";
  }

  if (today > endDate) {
    return "Encerrada";
  }

  return "Ativa";
}

function getStatusClass(status: string) {
  if (status === "Ativa") {
    return "px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";
  }

  if (status === "Agendada") {
    return "px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700";
  }

  return "px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700";
}
