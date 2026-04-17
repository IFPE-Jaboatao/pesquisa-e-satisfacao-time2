'use client";'

import Limpeza from "@/components/Limpezaform";

export default function LimpezaPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-black text-2xl font-semibold mb-2">
        Pesquisa de Satisfação
      </h1>

      <h2 className="text-blue-700 font-semibold mb-4">
        Limpeza
      </h2>

      <Limpeza />
    </main>
  );
}