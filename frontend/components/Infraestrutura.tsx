'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Infraestrutura() {
  const router = useRouter();
  const [answers, setAnswers] = useState({
    qualidade: 0,
    wifi: 0,
    convivencia: 0,
    acessibilidade: 0,
    laboratorios: "",
  });

  function setRating(field: string, value: number) {
    setAnswers({ ...answers, [field]: value });
  }

  function handleSubmit() {
    localStorage.setItem("infraestrutura", JSON.stringify(answers));

    router.push("/seguranca");
  }

  return (
    <div className="bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-1 rounded-full"
        >
          Voltar
        </button>
        <span className="text-black text-sm font-semibold">Etapa 1 de 5</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
        <div className="bg-blue-600 h-3 rounded-full w-[20%]" />
      </div>

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <Question
          text="Como você avalia a qualidade das salas de aula, laboratórios e equipamentos?"
          value={answers.qualidade}
          onChange={(v) => setRating("qualidade", v)}
        />

        <div>
          <p className="text-black mb-1 font-medium">
            Os laboratórios, se aplicável, estão bem equipados e seguros?
          </p>
          <div className="text-black flex gap-3">
            {["Sim", "Não", "Não se aplica"].map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="laboratorios"
                  value={opt}
                  onChange={(e) =>
                    setAnswers({ ...answers, laboratorios: e.target.value })
                  }
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <Question
          text="Como você avalia o Wi-Fi?"
          value={answers.wifi}
          onChange={(v) => setRating("wifi", v)}
        />

        <Question
          text="Como você avalia as áreas de convivência?"
          value={answers.convivencia}
          onChange={(v) => setRating("convivencia", v)}
        />

        <Question
          text="Como você a acessibilidade?"
          value={answers.acessibilidade}
          onChange={(v) => setRating("acessibilidade", v)}
        />
      </div>

      {/* Botão */}
      <button 
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700"
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