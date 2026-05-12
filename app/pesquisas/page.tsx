import Sidebar from "@/components/Dashboard/Sidebar";
import SurveysTable from "@/components/Dashboard/SurveysTable";

export default function PesquisasPage() {
  return (
    <main className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <section className="flex-1">
        {/* Header */}
        <header className="bg-[#d9edf3] px-6 py-4">
          <h1 className="text-xl font-bold">
            Olá, Administrador
          </h1>

          <p className="text-sm text-gray-700">
            Gerencie usuários, pesquisas e respostas do sistema.
          </p>
        </header>

        {/* Conteúdo */}
        <div className="p-6">
          <SurveysTable />
        </div>
      </section>
    </main>
  );
}