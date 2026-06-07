'use client';

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessCard() {
  const router = useRouter();

  function handleFinish() {
    router.push("/");
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center">

      <div className="flex justify-center mb-4">
        <CheckCircle
          size={80}
          className="text-green-600"
        />
      </div>

      <h2 className="text-2xl font-bold text-green-700 mb-3">
        Resposta enviada com sucesso
      </h2>

      <p className="text-gray-700 font-medium mb-2">
        Obrigado pela participação!
      </p>

      <p className="text-gray-600 text-sm mb-8">
        Sua opinião é fundamental para a melhoria contínua da instituição.
      </p>

      <button
        onClick={handleFinish}
        className="
          bg-blue-600
          text-white
          px-8
          py-3
          rounded-full
          hover:bg-blue-700
          transition
          font-medium
        "
      >
        Finalizar
      </button>
    </div>
  );
}