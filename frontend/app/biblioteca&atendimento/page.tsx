"use client";

import Header from "@/components/Header";
import Biblioteca from "@/components/Biblioteca&atendimento";

export default function BibliotecaAtendimentoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#EAF7FA] p-4">
      
        <Header />

      <h2 className="text-[#0B74DE] font-semibold mb-4">
        Biblioteca e Atendimento
      </h2>

      <Biblioteca />
    </main>
  );
}
