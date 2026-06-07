"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingQuestion from "@/components/RatingQuestion";
import ProgressBar from "@/components/ProgressBar";

export default function Limpezaform() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    salas: 0,
    banheiros: 0,
    comentario: "",
  });

  function setRating(field: string, value: number) {
    setAnswers({ ...answers, [field]: value });
  }

  function handleSubmit() {
    localStorage.setItem("limpeza", JSON.stringify(answers));

    router.push("/comentarios");
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
      <ProgressBar step={4} total={5} />

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <RatingQuestion
          text="Limpeza das salas de aula, laboratórios e áreas comuns."
          value={answers.salas}
          onChange={(v) => setRating("salas", v)}
        />

        <RatingQuestion
          text="Limpeza dos banheiros."
          value={answers.banheiros}
          onChange={(v) => setRating("banheiros", v)}
        />

        <div>
          <p className="font-medium mb-1">Comentários (opcional)</p>
          <p className="text-xs mb-1 text-gray-700">O que precisa melhorar?</p>

          <textarea
            placeholder="Digite seus comentários aqui..."
            value={answers.comentario}
            onChange={(e) =>
              setAnswers({ ...answers, comentario: e.target.value })
            }
            className="w-full p-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
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