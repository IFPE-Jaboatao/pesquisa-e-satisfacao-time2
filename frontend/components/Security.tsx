"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingQuestion from "@/components/RatingQuestion";
import ProgressBar from "@/components/ProgressBar";

export default function Security() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    seguranca: 0,
    acesso: 0,
    iluminacao: 0,
    segurancaNoturna: 0,
  });

  function setRating(field: string, value: number) {
    setAnswers({ ...answers, [field]: value });
  }

  function handleSubmit() {
    localStorage.setItem("seguranca", JSON.stringify(answers));

    router.push("/biblioteca&atendimento");
  }

  return (
    <div className="bg-white border border-[#9BDDE5] p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-[#0B74DE] text-white px-4 py-1 rounded-full"
        >
          Voltar
        </button>
      </div>

      {/* Barra de progresso */}
      <ProgressBar step={2} total={5} />

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <RatingQuestion
          text="Como você avalia a segurança do campus?"
          value={answers.seguranca}
          onChange={(v) => setRating("seguranca", v)}
        />

        <RatingQuestion
          text="Como você avalia o controle de acesso?"
          value={answers.acesso}
          onChange={(v) => setRating("acesso", v)}
        />

        <RatingQuestion
          text="Como você avalia a iluminação externa do campus?"
          value={answers.iluminacao}
          onChange={(v) => setRating("iluminacao", v)}
        />

        <RatingQuestion
          text="Como você avalia a segurança do periodo noturno?"
          value={answers.segurancaNoturna}
          onChange={(v) => setRating("segurancaNoturna", v)}
        />
      </div>

      {/* Botão */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-[#0B74DE] text-white py-2 rounded-full hover:bg-[#075FB5]"
      >
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
