"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    console.log("Respostas:", answers);
    router.push("/comentarios");
  }

  return (
    <div className="bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 text-white px-4 py-1 rounded-full">
          Voltar
        </button>
        <span className="text-black text-sm font-semibold">Etapa 4 de 5</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
        <div className="bg-blue-600 h-3 rounded-full w-[80%]" />
      </div>
      

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <Question
          text="Limpeza das salas de aula, laboratórios e áreas comuns."
          value={answers.salas}
          onChange={(v) => setRating("salas", v)}
        />

        <Question
          text="Limpeza dos banheiros."
          value={answers.banheiros}
          onChange={(v) => setRating("banheiros", v)}
        />
        
         <div>
          <p className="font-medium mb-1">Comentários (opcional)</p>
          <p className="text-xs mb-1 text-gray-700">
            O que precisa melhorar?
          </p>

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