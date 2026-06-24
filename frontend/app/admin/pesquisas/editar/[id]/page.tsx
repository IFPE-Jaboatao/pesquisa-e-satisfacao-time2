"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function EditarPesquisaPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    async function loadSurvey() {
      const survey = await apiFetch(`/surveys/${id}`);

      setForm({
        title: survey.title,
        description: survey.description || "",
        startDate: survey.startDate?.split("T")[0],
        endDate: survey.endDate?.split("T")[0],
      });
    }

    loadSurvey();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(`${form.startDate}T00:00:00`);
    const endDate = new Date(`${form.endDate}T00:00:00`);

    if (startDate < today) {
      alert("A data inicial da pesquisa não pode ser anterior à data atual.");
      return;
    }

    if (endDate < startDate) {
      alert("A data final não pode ser anterior à data inicial.");
      return;
    }

    try {
      await apiFetch(`/surveys/${id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });

      alert("Pesquisa atualizada com sucesso!");

      router.push("/admin/pesquisas");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a pesquisa.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow max-w-2xl"
    >
      <h2 className="text-xl font-bold mb-4">Editar Pesquisa</h2>

      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="date"
        value={form.startDate}
        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="date"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        className="w-full border p-3 rounded mb-4"
      />

      <button
        type="submit"
        className="bg-[#0B74DE] text-white px-5 py-2 rounded"
      >
        Salvar Alterações
      </button>
    </form>
  );
}
