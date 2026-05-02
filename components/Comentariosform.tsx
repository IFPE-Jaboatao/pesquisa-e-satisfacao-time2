'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Comentariosform() {
  const router = useRouter();
  const [answers, setAnswers] = useState({

    comentario: "",
    gosta: "",
    melhorar: "",
    sugestao: "",
    recomendaria: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  }

  function handleSubmit() {
    console.log("Respostas:", answers);
    router.push("/sucesso");
  }

  return (
    <div className="bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-md">
      {/* Topo */}
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-600 text-white px-4 py-1 rounded-full">
          Voltar
        </button>
        <span className="text-black text-sm font-semibold">Etapa 5 de 5</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
        <div className="bg-blue-600 h-3 rounded-full w-[100%]" />
      </div>
      

      {/* Perguntas */}
      <div className="text-black space-y-4 text-sm">
        <div>
          <p>1. O que você mais gosta na universidade?</p>
          <textarea
            name="gosta"
            placeholder="O que você mais gosta na universidade?"
            value={answers.gosta}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 mt-1"
          />
        </div>

        <div>
          <p>2. O que precisa ser melhorado?</p>
          <textarea
            name="melhorar"
            placeholder="O que precisa ser melhorado?"
            value={answers.melhorar}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 mt-1"
          />
        </div>

        <div>
          <p>3. Deixe uma sugestão adicional</p>
          <textarea
            name="sugestao"
            placeholder="Deixe uma sugestão adicional"
            value={answers.sugestao}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-400 mt-1"
          />
        </div>

        <div>
          <p>4. Você recomendaria a instituição?</p>
          <div className="mt-1 space-y-1">
            {["Sim", "Talvez", "Não"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="recomendaria"
                  aria-label={`Você recomendaria a instituição: ${opt}`}
                  value={opt}
                  onChange={handleChange}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>

       


      {/* Botão */}
      <button  onClick={handleSubmit} className="mt-6 w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700">
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



