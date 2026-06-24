"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type ActiveSurvey = {
  id: number;
  title: string;
};

export default function FormCard() {
  const router = useRouter();

  const [activeSurvey, setActiveSurvey] = useState<ActiveSurvey | null>(null);

  const [form, setForm] = useState({
    curso: "ADS",
    periodo: "2026.1",
    turno: "Noite",
    semestre: "3º",
    campus: "Jaboatão dos Guararapes",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadActiveSurvey() {
      try {
        const surveys = await apiFetch("/surveys/active");

        if (surveys && surveys.length > 0) {
          setActiveSurvey(surveys[0]);
        }
      } catch {
        setActiveSurvey(null);
      }
    }

    loadActiveSurvey();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      localStorage.setItem("inicio", JSON.stringify(form));

      const surveys = await apiFetch("/surveys/active");

      if (!surveys || surveys.length === 0) {
        alert("Nenhuma pesquisa ativa encontrada.");
        return;
      }

      const survey = await apiFetch(`/surveys/public/${surveys[0].id}`);

      localStorage.setItem("survey", JSON.stringify(survey));
      localStorage.setItem("surveyId", String(survey.id));

      router.push("/infraestrutura");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Erro ao carregar pesquisa.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-3xl flex flex-col items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
          Bem-vindo à Pesquisa de Satisfação!
        </h2>

        <p className="text-sm md:text-base text-gray-700 max-w-2xl">
          Sua pesquisa é muito importante para melhorarmos nossos serviços e
          proporcionarmos uma experiência cada vez melhor para todos.
        </p>
       
      </div>
      <div>
        {activeSurvey && (
          <p className="text-2x1 text-[#0B74DE] font-semibold mb-3">
            Pesquisa ativa: {activeSurvey.title}
          </p>
        )}
      </div>

      <div className="bg-white border border-[#9BDDE5] p-5 md:p-8 rounded-2xl shadow-lg w-full max-w-md md:max-w-2xl">
        <p className="text-[#111827] text-sm font-semibold mb-5">
          Antes de começar, preencha seus dados:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label
              htmlFor="curso"
              className="block text-[#111827] font-medium mb-1"
            >
              Curso
            </label>
            <select
              id="curso"
              name="curso"
              value={form.curso}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#9BDDE5] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B74DE]"
            >
              <option>Selecione um curso</option>
              <option>Informática para Internet</option>
              <option>Qualidade</option>
              <option>Comércio e Gestão de Negócios</option>
              <option>Administração</option>
              <option>Técnico em Desenvolvimento de Sistemas</option>
              <option>Análise e Desenvolvimento de Sistemas</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="periodo"
              className="block text-[#111827] font-medium mb-1"
            >
              Período
            </label>
            <select
              id="periodo"
              name="periodo"
              value={form.periodo}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#9BDDE5] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B74DE]"
            >
              <option>Selecione um período</option>
              <option>2025.1</option>
              <option>2025.2</option>
              <option>2026.1</option>
              <option>2026.2</option>
              <option>2027.1</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="turno"
              className="block text-[#111827] font-medium mb-1"
            >
              Turno
            </label>
            <select
              id="turno"
              name="turno"
              value={form.turno}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#9BDDE5] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B74DE]"
            >
              <option>Selecione um turno</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="campus"
              className="block text-[#111827] font-medium mb-1"
            >
              Campus
            </label>
            <select
              id="campus"
              name="campus"
              value={form.campus}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#9BDDE5] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B74DE]"
            >
              <option>Selecione um campus</option>
              <option>Jaboatão dos Guararapes</option>
              <option>Recife</option>
              <option>Paulista</option>
              <option>Ipojuca</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="semestre"
              className="block text-[#111827] font-medium mb-1"
            >
              Semestre
            </label>
            <select
              id="semestre"
              name="semestre"
              value={form.semestre}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-[#9BDDE5] bg-white focus:outline-none focus:ring-2 focus:ring-[#0B74DE]"
            >
              <option>Selecione um semestre</option>
              <option>1º</option>
              <option>2º</option>
              <option>3º</option>
              <option>4º</option>
              <option>5º</option>
              <option>6º</option>
              <option>7º</option>
              <option>8º</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 mx-auto block w-full md:w-56 bg-[#0B74DE] text-white py-3 rounded-lg hover:bg-[#075FB5] transition disabled:bg-gray-400 shadow-md font-medium"
        >
          {loading ? "Carregando..." : "Iniciar Pesquisa"}
        </button>

        <div className="mt-5 bg-[#DDF7FB] border border-[#9BDDE5] rounded-xl p-4 text-sm text-[#111827]">
          <p className="font-semibold mb-1">Importante</p>
          <p>Você poderá responder esta pesquisa uma única vez.</p>
          <p>Suas respostas são seguras e usadas para fins de melhoria.</p>
        </div>
      </div>
    </section>
  );
}
