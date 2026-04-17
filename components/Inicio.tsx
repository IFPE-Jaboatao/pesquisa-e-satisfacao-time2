"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormCard() {
  const router = useRouter();
  const [form, setForm] = useState({
    curso: "ADS",
    periodo: "2026.1",
    turno: "Noite",
    semestre: "3º",
    campus: "Jaboatão dos Guararapes",
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    console.log("Dados:", form);
    alert("Pesquisa iniciada!");
    router.push("/inflaestrutura");
  }

  return (
    <div className="bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <p className="text-black text-center text-sm mb-2">
        Sua participação é anônima.
      </p>
      <p className="text-black text-center text-sm mb-4">
        Nenhuma informação pessoal será coletada.
      </p>

      <div className="text-sm mb-4">
        <p className="text-black mb-2">Áreas avaliadas:</p>
        <ul className="text-black list-disc list-inside">
          <li>Infraestrutura</li>
          <li>Segurança</li>
          <li>Biblioteca</li>
          <li>Atendimento</li>
          <li>Limpeza</li>
        </ul>
      </div>

      <p className="text-black text-sm mb-4">
        Antes de começar, preencha seus dados:
      </p>

      <div className="text-black space-y-3 text-sm">
        <div>
          <label htmlFor="curso">Curso:</label>
          <select
            id="curso"
            name="curso"
            value={form.curso}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option>ADS</option>
            <option>Engenharia</option>
          </select>
        </div>

        <div>
          <label htmlFor="periodo">Período:</label>
          <select
            id="periodo"
            name="periodo"
            value={form.periodo}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option>2026.1</option>
            <option>2026.2</option>
          </select>
        </div>

        <div>
          <label htmlFor="turno">Turno:</label>
          <select
            id="turno"
            name="turno"
            value={form.turno}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option>Noite</option>
            <option>Manhã</option>
            <option>Tarde</option>
          </select>
        </div>

        <div>
          <label htmlFor="semestre">Semestre:</label>
          <select
            id="semestre"
            name="semestre"
            value={form.semestre}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option>1º</option>
            <option>2º</option>
            <option>3º</option>
          </select>
        </div>

        <div>
          <label htmlFor="campus">Campus:</label>
          <select
            id="campus"
            name="campus"
            value={form.campus}
            onChange={handleChange}
            className="w-full p-2 rounded"
          >
            <option>Jaboatão dos Guararapes</option>
            <option>Recife</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
      >
        Iniciar Pesquisa
      </button>
    </div>
  );
}