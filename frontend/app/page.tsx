"use client";

import Header from "@/components/Header";
import Inicio from "@/components/Inicio";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EAF7FA] flex flex-col items-center p-6">
      <Header />

      <Inicio />
    </main>
  );
}
