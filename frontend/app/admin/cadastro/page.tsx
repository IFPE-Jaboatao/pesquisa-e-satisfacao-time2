'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function CadastroAdminPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit() {
    try {
      if (form.password !== form.confirmPassword) {
        alert("As senhas não conferem.");
        return;
      }

      await apiFetch("/auth/users", {
        method: "POST",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      alert("Administrador cadastrado com sucesso!");
      router.push("/admin/login");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar administrador.",
      );
    }
  }

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#EAF7FA]">
      <section className="hidden md:flex flex-col items-center justify-center p-10">
        <Image
          src="/imagens/logo-icon.png"
          alt="Avalia Plus"
          width={90}
          height={90}
        />

        <h1 className="text-3xl font-bold text-[#111827] mt-4">
          Avalia-Plus
        </h1>

        <p className="text-gray-600 mb-10">
          Sistema de Pesquisa de Satisfação
        </p>

        <h2 className="text-xl font-bold text-[#111827] mb-2">
          Cadastro de Administrador
        </h2>

        <p className="text-center text-sm text-gray-600 max-w-xs">
          Crie sua conta para começar a gerenciar o sistema.
        </p>
      </section>

      <section className="flex items-center justify-center bg-white p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">
            Criar conta do administrador
          </h2>

          <p className="text-sm text-gray-600 mb-8">
            Preencha os dados para se cadastrar
          </p>

          <label className="text-sm font-medium">Nome completo</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mb-4"
          />

          <label className="text-sm font-medium">E-mail</label>
          <input
            type="email"
            placeholder="Seu e-mail"
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
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mb-4"
          />

          <label className="text-sm font-medium">Confirmar senha</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full p-3 border border-[#9BDDE5] rounded-lg mb-6"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-[#0B74DE] text-white py-3 rounded-lg hover:bg-[#075FB5] transition"
          >
            Criar conta
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/login")}
            className="w-full text-sm text-[#0B74DE] mt-4"
          >
            Já possui uma conta? Fazer login
          </button>
        </div>
      </section>
    </main>
  );
}