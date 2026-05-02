'use client';

import StepForm from "@/components/Stepform";

export default function InfraestruturaPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-black text-2xl font-semibold mb-2">
        Pesquisa de Satisfação
      </h1>

      <h2 className="text-blue-700 font-semibold mb-4">
        Infraestrutura
      </h2>

      <StepForm />
    </main>
  );
}