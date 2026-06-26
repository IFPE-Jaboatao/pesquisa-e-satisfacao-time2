"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "@/lib/api";

export default function LoginAcessoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      localStorage.setItem("adminToken", data.access_token);

      router.push("/admin/dashboard");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao fazer login.");
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#EAF7FA]">
      <section className="flex flex-col items-center justify-center p-6 md:p-10">
        <Image
          src="/imagens/logo-icon.png"
          alt="Avalia Plus"
          width={80}
          height={80}
        />

        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mt-4">
          Avalia-Plus
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Sistema de Pesquisa de Satisfação
        </p>

        <div className="hidden md:block">
          <div className="hidden md:block">
            <Image
              src="/imagens/tela-login.png"
              alt="Imagem Login"
              width={500}
              height={500}
            />

            <p className="text-center font-semibold text-[#111827]">
              Gerencie pesquisas, usuários e respostas
            </p>

            <p className="text-center text-sm text-gray-600 mt-2">
              Tudo que você precisa para acompanhar a pesquisa.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">
            Acesso do Administrador
          </h2>

          <p className="text-sm text-gray-600 mb-8">
            Faça login para acessar o sistema
          </p>

          <label className="text-sm font-medium">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mb-4"
          />

          <label className="text-sm font-medium">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mb-6"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-[#0B74DE] text-white py-3 rounded-lg hover:bg-[#075FB5]"
          >
            Entrar
          </button>
        </div>
      </section>
    </main>
  );
}
