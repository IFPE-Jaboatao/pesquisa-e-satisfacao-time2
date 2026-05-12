"use client";

import {
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

//integração com a API
//const response = await fetch("/api/pesquisas")

const pesquisas = [
  {
    id: 1,
    nome: "Pesquisa 1",
    status: "Ativo",
    periodo: "20/04/2026 - 20/05/2026",
    dataCriacao: "20/04/2026",
    respostas: 100,
  },
  {
    id: 2,
    nome: "Pesquisa 2",
    status: "Ativo",
    periodo: "20/04/2026 - 20/05/2026",
    dataCriacao: "20/04/2026",
    respostas: 85,
  },
  {
    id: 3,
    nome: "Pesquisa 3",
    status: "Ativo",
    periodo: "20/04/2026 - 20/05/2026",
    dataCriacao: "20/04/2026",
    respostas: 62,
  },
];

const filtered = pesquisas.filter((pesquisa) => pesquisa.nome.includes(""));

export default function SurveysTable() {
  return (
    <div className="bg-white rounded-lg shadow border border-cyan-200 p-5">
      
      {/* Topo */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-lg">
            Pesquisas
          </h2>

          <p className="text-sm text-gray-600">
            Veja todas as pesquisas cadastradas
          </p>
        </div>

        <div className="flex items-center gap-3">
          
          {/* Busca */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar Pesquisa..."
              className="border border-cyan-300 rounded px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botão */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
            Criar Pesquisa
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">
                Nome da Pesquisa
              </th>

              <th className="text-left px-4 py-3">
                Status
              </th>

              <th className="text-left px-4 py-3">
                Período
              </th>

              <th className="text-left px-4 py-3">
                Data da criação
              </th>

              <th className="text-left px-4 py-3">
                Respostas
              </th>

              <th className="text-center px-4 py-3">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((pesquisa) => (
              <tr
                key={pesquisa.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  {pesquisa.nome}
                </td>

                <td className="px-4 py-3">
                  <span className="text-green-600 font-medium">
                    {pesquisa.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {pesquisa.periodo}
                </td>

                <td className="px-4 py-3">
                  {pesquisa.dataCriacao}
                </td>

                <td className="px-4 py-3">
                  {pesquisa.respostas}
                </td>

                {/* Ações */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    
                    <button
                      className="text-blue-500 hover:scale-110 transition"
                      title="Visualizar pesquisa"
                      aria-label="Visualizar pesquisa"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      className="text-cyan-500 hover:scale-110 transition"
                      title="Editar pesquisa"
                      aria-label="Editar pesquisa"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="text-red-500 hover:scale-110 transition"
                      title="Excluir pesquisa"
                      aria-label="Excluir pesquisa"
                    >
                      <Trash2 size={18} />
                    </button>

                                    

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}