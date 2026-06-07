"use client";

import Header from "@/components/Header";
import Infraestrutura from "@/components/Infraestrutura";

export default function InfraestruturaPage() {
  return (
    <main className="min-h-screen bg-[#EAF7FA] flex flex-col items-center p-6">
      <Header />

      <h2 className="text-[#0B74DE] font-semibold mb-4">Infraestrutura</h2>

      <Infraestrutura />
    </main>
  );
}
