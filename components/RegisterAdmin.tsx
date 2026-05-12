'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterAdmin() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log(form);

    // futura integração com API
    // await fetch(...)

    alert("Conta criada com sucesso!");
    router.push("/admin/login");
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">
      
      {/* Lado esquerdo */}
      <div className="bg-[#d9edf3] p-10 flex flex-col items-center justify-center text-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-md flex items-center justify-center font-bold text-xl">
            A+
          </div>

          <div className="text-left">
            <h1 className="font-bold text-xl">
              Avalia-Plus
            </h1>

            <p className="text-xs text-gray-700">
              Sistema de Pesquisa de Satisfação
            </p>
          </div>
        </div>

        {/* Ilustração */}
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
            alt="Cadastro"
            className="w-36 mx-auto"
          />
        </div>

        {/* Texto */}
        <div>
          <h2 className="font-semibold mb-2">
            Cadastro de Administrador
          </h2>

          <p className="text-sm text-gray-700">
            Crie sua conta para começar a gerenciar o sistema.
          </p>
        </div>
      </div>

      {/* Lado direito */}
      <div className="p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">
          Criar conta do administrador
        </h2>

        <p className="text-sm text-gray-600 mb-8">
          Preencha os dados para se cadastrar
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome completo (username)
            </label>

            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className="w-full border border-cyan-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              E-mail
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seu email"
              className="w-full border border-cyan-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Senha
            </label>

            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-cyan-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar Senha
            </label>

            <input
              type="password"
              name="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-cyan-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2"
          >
            Criar conta
          </button>
        </form>

        {/* Login */}
        <p className="text-sm text-center mt-5">
          Já possui uma conta?{" "}
          <button
            onClick={() => router.push("app/page.tsx")}
            className="text-blue-600 font-medium hover:underline"
          >
            Fazer Login
          </button>
        </p>
      </div>
    </div>
  );
}