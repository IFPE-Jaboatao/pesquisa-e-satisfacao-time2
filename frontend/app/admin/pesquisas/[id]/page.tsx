"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

type Survey = {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

export default function VisualizarPesquisaPage() {
  const { id } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    async function loadSurvey() {
      try {
        const data = await apiFetch(`/surveys/${id}`);
        setSurvey(data);
      } catch {
        alert("Erro ao carregar pesquisa.");
      }
    }

    loadSurvey();
  }, [id]);

  if (!survey) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold">{survey.title}</h2>

      <p className="mt-3">
        <strong>Descrição:</strong> {survey.description}
      </p>

      <p className="mt-2">
        <strong>Data Inicial:</strong>{" "}
        {new Date(survey.startDate).toLocaleDateString("pt-BR")}
      </p>

      <p className="mt-2">
        <strong>Data Final:</strong>{" "}
        {new Date(survey.endDate).toLocaleDateString("pt-BR")}
      </p>

      <p className="mt-2">
        <strong>Status:</strong> {survey.isActive ? "Ativa" : "Inativa"}
      </p>
    </div>
  );
}
