'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Avalia-Plus
      </h1>

      <nav className="space-y-4 text-sm">
        <Link href="#dashboard" className="block hover:bg-cyan-600 px-3 py-2 rounded" onClick={() => router.push("/dashboard")}>
          Dashboard
        </Link>

        <Link href="#pesquisas" className="block hover:bg-cyan-600 px-3 py-2 rounded" onClick={() => router.push("/pesquisas")}>
          Pesquisas
        </Link>
        <Link href="#respostas" className="block hover:bg-cyan-600 px-3 py-2 rounded" onClick={() => router.push("/respostas")}>
          Respostas
        </Link>
        <Link href="#relatorios" className="block hover:bg-cyan-600 px-3 py-2 rounded" onClick={() => router.push("/relatorios")}>
          Relatórios
        </Link>
        <Link href="#usuarios" className="block hover:bg-cyan-600 px-3 py-2 rounded" onClick={() => router.push("/usuarios")}>
          Usuários
        </Link>

        <Link href="#sair" className="pt-8 text-red-200" onClick={() => router.push("/sair")}>
          Sair
        </Link>
      </nav>
    </aside>
  );
}