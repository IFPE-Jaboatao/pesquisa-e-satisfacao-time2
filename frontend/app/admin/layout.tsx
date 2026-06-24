"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/acesso/login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("adminToken");
    router.push("/acesso/login");
  }

  function menuClass(path: string) {
    const active = pathname.startsWith(path);

    return `w-full text-left px-3 py-2 rounded-lg transition ${
      active ? "bg-[#19B6C8] text-white font-semibold" : "hover:bg-blue-600"
    }`;
  }

  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 bg-[#0B74DE] text-white p-4 lg:p-5 flex flex-col">
        <div className="mb-4 lg:mb-8">
          <Image
            src="/imagens/logo-icon-br.png"
            alt="Avalia Plus"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-bold mt-2">Avalia-Plus</h1>
          <p className="text-xs">Sistema de Pesquisa de Satisfação</p>
        </div>

        <nav className="flex flex-wrap lg:flex-col gap-3 text-sm">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className={menuClass("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/admin/pesquisas")}
            className={menuClass("/admin/pesquisas")}
          >
            Pesquisas
          </button>

          <button
            onClick={() => router.push("/admin/respostas")}
            className={menuClass("/admin/respostas")}
          >
            Respostas
          </button>

        </nav>

        <button onClick={logout} className="mt-4 lg:mt-auto text-left">
          Sair
        </button>
      </aside>

      <section className="flex-1 bg-white min-h-screen overflow-x-hidden">
        <header className="bg-[#CFF6FB] p-4 lg:p-6">
          <h2 className="font-bold text-[#111827]">Olá, Administrador</h2>
          <p className="text-sm text-gray-700">
            Gerencie pesquisas e respostas do sistema.
          </p>
        </header>

        <div className="p-4 lg:p-6">{children}</div>
      </section>
    </main>
  );
}
