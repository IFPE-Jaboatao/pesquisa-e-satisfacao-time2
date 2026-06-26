"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Survey = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

type ResponseItem = {
  id: number;
  course?: string;
  campus?: string;
  createdAt: string;
  survey?: {
    title: string;
  };
};

export default function DashboardPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const surveysData = await apiFetch("/surveys");
        const responsesData = await apiFetch("/responses");

        setSurveys(surveysData);
        setResponses(responsesData);
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Erro ao carregar dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter(
    (survey) => getSurveyStatus(survey) === "Ativa",
  ).length;
  const totalResponses = responses.length;
  const responsesToday = responses.filter((response) =>
    isToday(response.createdAt),
  ).length;

  const recentSurveys = surveys.slice(0, 5);
  const recentResponses = responses.slice(0, 5);

  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-[#111827] mb-1">Dashboard</h2>

      <p className="text-sm text-gray-600 mb-6">
        Resumo geral das pesquisas e respostas do sistema.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card title="Total de pesquisas" value={totalSurveys} />
        <Card title="Pesquisas ativas" value={activeSurveys} />
        <Card title="Respostas recebidas" value={totalResponses} />
        <Card title="Participações hoje" value={responsesToday} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white border border-[#9BDDE5] rounded-xl shadow p-4">
          <h3 className="font-bold text-[#111827] mb-3">Pesquisas recentes</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#EAF7FA]">
                <tr>
                  <th className="p-2 text-left">Pesquisa</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Criada em</th>
                </tr>
              </thead>
              <tbody>
                {recentSurveys.map((survey) => (
                  <tr key={survey.id} className="border-t">
                    <td className="p-2">{survey.title}</td>
                    <td className="p-2">{getSurveyStatus(survey)}</td>
                    <td className="p-2">{formatDate(survey.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-[#9BDDE5] rounded-xl shadow p-4">
          <h3 className="font-bold text-[#111827] mb-3">Respostas recentes</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#EAF7FA]">
                <tr>
                  <th className="p-2 text-left">Pesquisa</th>
                  <th className="p-2 text-left">Curso</th>
                  <th className="p-2 text-left">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {recentResponses.map((response) => (
                  <tr key={response.id} className="border-t">
                    <td className="p-2">{response.survey?.title || "-"}</td>
                    <td className="p-2">{response.course || "-"}</td>
                    <td className="p-2">
                      {formatDateTime(response.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white border border-[#9BDDE5] rounded-xl shadow p-5">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-[#0B74DE] mt-2">{value}</p>
    </div>
  );
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

function isToday(date: string) {
  const inputDate = new Date(date);
  const today = new Date();

  return (
    inputDate.toLocaleDateString("pt-BR") === today.toLocaleDateString("pt-BR")
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("pt-BR");
}
