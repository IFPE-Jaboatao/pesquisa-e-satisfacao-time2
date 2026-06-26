"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function CriarPesquisaPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: true,
    isAnonymous: true,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
      return;
    }

    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.startDate || !form.endDate) {
      alert("Preencha o título, data inicial e data final.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(`${form.startDate}T00:00:00`);
    const endDate = new Date(`${form.endDate}T00:00:00`);

    if (startDate < today) {
      alert("A data inicial não pode ser anterior à data atual.");
      return;
    }

    if (endDate < startDate) {
      alert("A data final não pode ser anterior à data inicial.");
      return;
    }

    try {
      setLoading(true);

      const survey = await apiFetch("/surveys", {
        method: "POST",
        body: JSON.stringify(form),
      });

      await createDefaultQuestions(survey.id);

      alert("Pesquisa criada com sucesso!");
      router.push("/admin/pesquisas");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao criar pesquisa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl bg-white border border-[#9BDDE5] rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-[#111827] mb-2">Criar Pesquisa</h2>

      <p className="text-sm text-gray-600 mb-6">
        Preencha os dados para cadastrar uma nova pesquisa.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nome da pesquisa</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: Pesquisa de Satisfação 2026.1"
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descreva o objetivo da pesquisa"
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Data inicial</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-[#9BDDE5] rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Data final</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-[#9BDDE5] rounded-lg mt-1"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Pesquisa ativa
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={form.isAnonymous}
              onChange={handleChange}
            />
            Pesquisa anônima
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/pesquisas")}
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#0B74DE] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#075FB5] disabled:bg-gray-400"
          >
            {loading ? "Salvando..." : "Salvar Pesquisa"}
          </button>
        </div>
      </form>
    </div>
  );
}

type DefaultQuestion = {
  title: string;
  type: "RATING" | "SINGLE_CHOICE" | "TEXT";
  category: string;
  step: number;
  order: number;
};

async function createDefaultQuestions(surveyId: number) {
  const questions: DefaultQuestion[] = [
    {
      title: "Qualidade das salas de aula, laboratórios e equipamentos",
      type: "RATING",
      category: "Infraestrutura",
      step: 1,
      order: 1,
    },
    {
      title: "Os laboratórios estão bem equipados e seguros?",
      type: "SINGLE_CHOICE",
      category: "Infraestrutura",
      step: 1,
      order: 2,
    },
    {
      title: "Qualidade do Wi-Fi",
      type: "RATING",
      category: "Infraestrutura",
      step: 1,
      order: 3,
    },
    {
      title: "Áreas de convivência",
      type: "RATING",
      category: "Infraestrutura",
      step: 1,
      order: 4,
    },
    {
      title: "Acessibilidade",
      type: "RATING",
      category: "Infraestrutura",
      step: 1,
      order: 5,
    },
    {
      title: "Segurança no campus",
      type: "RATING",
      category: "Segurança",
      step: 2,
      order: 1,
    },
    {
      title: "Controle de acesso",
      type: "RATING",
      category: "Segurança",
      step: 2,
      order: 2,
    },
    {
      title: "Iluminação externa",
      type: "RATING",
      category: "Segurança",
      step: 2,
      order: 3,
    },
    {
      title: "Segurança no período noturno",
      type: "RATING",
      category: "Segurança",
      step: 2,
      order: 4,
    },
    {
      title: "Acervo disponível",
      type: "RATING",
      category: "Biblioteca e Atendimento",
      step: 3,
      order: 1,
    },
    {
      title: "Espaço para estudo",
      type: "RATING",
      category: "Biblioteca e Atendimento",
      step: 3,
      order: 2,
    },
    {
      title: "Secretaria acadêmica",
      type: "RATING",
      category: "Biblioteca e Atendimento",
      step: 3,
      order: 3,
    },
    {
      title: "Tempo de resposta",
      type: "RATING",
      category: "Biblioteca e Atendimento",
      step: 3,
      order: 4,
    },
    {
      title: "Limpeza das salas",
      type: "RATING",
      category: "Limpeza",
      step: 4,
      order: 1,
    },
    {
      title: "Limpeza dos banheiros",
      type: "RATING",
      category: "Limpeza",
      step: 4,
      order: 2,
    },
    {
      title: "Comentário sobre limpeza",
      type: "TEXT",
      category: "Limpeza",
      step: 4,
      order: 3,
    },
    {
      title: "O que você mais gosta na universidade?",
      type: "TEXT",
      category: "Comentários",
      step: 5,
      order: 1,
    },
    {
      title: "O que precisa ser melhorado?",
      type: "TEXT",
      category: "Comentários",
      step: 5,
      order: 2,
    },
    {
      title: "Sugestão adicional",
      type: "TEXT",
      category: "Comentários",
      step: 5,
      order: 3,
    },
    {
      title: "Você recomendaria a instituição?",
      type: "SINGLE_CHOICE",
      category: "Comentários",
      step: 5,
      order: 4,
    },
  ];

  for (const question of questions) {
    await apiFetch("/questions", {
      method: "POST",
      body: JSON.stringify({
        ...question,
        surveyId,
      }),
    });
  }
}
