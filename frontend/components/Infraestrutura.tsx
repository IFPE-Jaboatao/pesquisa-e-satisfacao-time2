"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RatingQuestion from "@/components/RatingQuestion";
import ProgressBar from "@/components/ProgressBar";

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
      <ProgressBar step={1} total={5} />

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <RatingQuestion
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

        <RatingQuestion
          text="Como você avalia o Wi-Fi?"
          value={answers.wifi}
          onChange={(v) => setRating("wifi", v)}
        />

        <RatingQuestion
          text="Como você avalia as áreas de convivência?"
          value={answers.convivencia}
          onChange={(v) => setRating("convivencia", v)}
        />

        <RatingQuestion
          text="Como você a acessibilidade?"
          value={answers.acessibilidade}
          onChange={(v) => setRating("acessibilidade", v)}
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