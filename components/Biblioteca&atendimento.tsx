"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    console.log("Respostas:", answers);
    router.push("/limpeza");
  }

  return (
    <div className="bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 text-white px-4 py-1 rounded-full">
          Voltar
        </button>
        <span className="text-black text-sm font-semibold">Etapa 3 de 5</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
        <div className="bg-blue-600 h-3 rounded-full w-[60%]" />
      </div>
      
      <div className="text-black space-y-4 text-sm font-semibold">Biblioteca </div>

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <Question
          text="Acervo disponivel"
          value={answers.acervo}
          onChange={(v) => setRating("acervo", v)}
        />

        <Question
          text="Espaço para estudo"
          value={answers.espaco}
          onChange={(v) => setRating("espaco", v)}
        />
        
        <div className="text-black space-y-4 text-sm font-semibold">Atendimento </div>

        <Question
          text="Secretaria acadêmica."
          value={answers.secretaria}
          onChange={(v) => setRating("secretaria", v)}
        />

        <Question
          text="Tempo de resposta."
          value={answers.temporesposta}
          onChange={(v) => setRating("temporesposta", v)}
        />
      </div>

      {/* Botão */}
      <button
      onClick={handleSubmit}
      className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
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

/* ⭐ Componente de avaliação */
function Question({
  text,
  value,
  onChange,
}: {
  text: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const emojis = ["😡", "🙁", "😐", "🙂", "😄"];

  return (
    <div>
      <p className="mb-1 font-medium">{text}</p>

      <div className="flex gap-2">
        {emojis.map((emoji, index) => {
          const rating = index + 1;

          return (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              className={`text-xl px-2 py-1 rounded transition ${
                value === rating
                  ? "bg-yellow-300 scale-110"
                  : "hover:scale-110"
              }`}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}