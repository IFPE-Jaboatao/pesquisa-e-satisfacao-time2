"use client";

import Header from "@/components/Header";
import Limpeza from "@/components/Limpezaform";

export default function LimpezaPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#EAF7FA] p-4">
      <Header />

      <h2 className="text-[#0B74DE] font-semibold mb-4">Limpeza</h2>

      <Limpeza />
    </main>
  );
}
