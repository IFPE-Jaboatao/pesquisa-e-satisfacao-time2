"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingQuestion from "@/components/RatingQuestion";
import ProgressBar from "@/components/ProgressBar";

export default function BibliotecaAtendimento() {
  const router = useRouter();

  const [answers, setAnswers] = useState({
    acervo: 0,
    espaco: 0,
    secretaria: 0,
    temporesposta: 0,
  });

  function setRating(field: string, value: number) {
    setAnswers({ ...answers, [field]: value });
  }

  function handleSubmit() {
    localStorage.setItem("bibliotecaAtendimento", JSON.stringify(answers));

    router.push("/limpeza");
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
      <ProgressBar step={3} total={5} />

      <div className="text-black space-y-4 text-sm font-semibold">
        Biblioteca{" "}
      </div>

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <RatingQuestion
          text="Acervo disponivel"
          value={answers.acervo}
          onChange={(v) => setRating("acervo", v)}
        />

        <RatingQuestion
          text="Espaço para estudo"
          value={answers.espaco}
          onChange={(v) => setRating("espaco", v)}
        />

        <div className="text-black space-y-4 text-sm font-semibold">
          Atendimento{" "}
        </div>

        <RatingQuestion
          text="Secretaria acadêmica."
          value={answers.secretaria}
          onChange={(v) => setRating("secretaria", v)}
        />

        <RatingQuestion
          text="Tempo de resposta."
          value={answers.temporesposta}
          onChange={(v) => setRating("temporesposta", v)}
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