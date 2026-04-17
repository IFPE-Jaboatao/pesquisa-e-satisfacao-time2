"use client";

import { useRouter } from "next/navigation";

export default function SuccessCard() {
  const router = useRouter();

  function handleFinish() {
    // você pode redirecionar pra home ou reiniciar pesquisa
    router.push("/");
  }

  return (
    <div className="text-black bg-slate-300 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
      <p className="font-semibold mb-6">
        Obrigado pela sua participação!
      </p>

      <p className="text-sm mb-8">
        Sua resposta foi registrada de forma anônima e será usada para melhorar a universidade.
      </p>

      <button
        onClick={handleFinish}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Finalizar
      </button>
    </div>
  );
}