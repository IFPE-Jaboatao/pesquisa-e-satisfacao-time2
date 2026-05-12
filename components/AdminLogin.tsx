'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    console.log(form);

    // futura integração com API
    // await fetch(...)

    router.push("/admin/dashboard");
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">
      
      {/* Lado esquerdo */}
      <div className="bg-[#d9edf3] p-10 flex flex-col items-center justify-center text-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
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

        {/* Imagem ilustrativa */}
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2620/2620971.png"
            alt="Dashboard"
            className="w-40 mx-auto"
          />
        </div>

        {/* Texto */}
        <div>
          <h2 className="font-semibold mb-2">
            Gerencie pesquisas, usuários e respostas
          </h2>

          <p className="text-sm text-gray-700">
            Tudo que você precisa para acompanhar a pesquisa.
          </p>
        </div>
      </div>

      {/* Lado direito */}
      <div className="p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">
          Acesso do Administrador
        </h2>

        <p className="text-sm text-gray-600 mb-8">
          Faça login para acessar o sistema
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          
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
              placeholder="Digite seu e-mail"
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
              placeholder="Digite sua senha"
              className="w-full border border-cyan-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botão */}
          <button
            onClick={() => router.push("/dashboard")}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>

        {/* Link */}
        <button
          onClick={() => router.push("/CadastroADM")}
          className="text-blue-600 text-sm mt-4 hover:underline">
          Faça seu cadastro de administrador.
        </button>
      </div>
    </div>
  );
}