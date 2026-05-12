"use client";

import {
    Eye,
    Trash2,
} from "lucide-react";

const respostas = [
  {
    id: 1,
    pesquisa: "Pesquisa 1",
    campus: "Recife",
    curso: "ADS",
    data: "09/05/2026",
  },
  {
    id: 2,
    pesquisa: "Pesquisa 1",
    campus: "Jaboatão dos Guararapes",
    curso: "ADS",
    data: "09/05/2026",
  },
  {
    id: 3,
    pesquisa: "Pesquisa 1",
    campus: "Paulista",
    curso: "ADS",
    data: "09/05/2026",
  },
  {
    id: 4,
    pesquisa: "Pesquisa 1",
    campus: "Ipojuca",
    curso: "ADS",
    data: "09/05/2026",
  },
];

const filtradas = respostas.filter((resposta) => resposta.pesquisa.includes(""));

export default function ResponsesTable() {
  return (
    <div className="bg-white rounded-lg shadow border border-cyan-200 p-5">
      
      {/* Topo */}
      <div className="mb-5">
        <h2 className="font-bold text-lg">
          Respostas
        </h2>

        <p className="text-sm text-gray-600">
          Consulte todas as respostas recebidas
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-5">
        
        <select title="Todas as pesquisas" className="border border-cyan-300 rounded px-3 py-2 text-sm">
          <option>Todas as pesquisas</option>
        </select>

        <select title="Todos os cursos" className="border border-cyan-300 rounded px-3 py-2 text-sm">
          <option>Todos os cursos</option>
        </select>

        <input
          type="text"
          value="01/01/2026 a 30/06/2026"
          readOnly
          title="Período"
          className="border border-cyan-300 rounded px-3 py-2 text-sm"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition ml-auto">
          Filtrar
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">
                ID
              </th>

              <th className="text-left px-4 py-3">
                Pesquisa
              </th>

              <th className="text-left px-4 py-3">
                Campus
              </th>

              <th className="text-left px-4 py-3">
                Curso
              </th>

              <th className="text-left px-4 py-3">
                Data/Hora
              </th>

              <th className="text-center px-4 py-3">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {filtradas.map((resposta) => (
              <tr
                key={resposta.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  {resposta.id}
                </td>

                <td className="px-4 py-3">
                  {resposta.pesquisa}
                </td>

                <td className="px-4 py-3">
                  {resposta.campus}
                </td>

                <td className="px-4 py-3">
                  {resposta.curso}
                </td>

                <td className="px-4 py-3">
                  {resposta.data}
                </td>

                {/* Ações */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    
                    <button className="text-blue-500 hover:scale-110 transition" aria-label="Visualizar">
                      <Eye size={18}  />
                     
                    </button>

                    <button className="text-red-500 hover:scale-110 transition" aria-label="Excluir">
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