import Sidebar from "@/components/Dashboard/Sidebar";
import StatsCards from "@/components/Dashboard/StatsCards";
import PerformanceChart from "@/components/Dashboard/PerformanceChart";
import PieChartStats from "@/components/Dashboard/PieChartStats";
import RecentSurveys from "@/components/Dashboard/RecentSurveys";
import RecentResponses from "@/components/Dashboard/RecentResponses";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <section className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-xl font-bold">
            Olá, Administrador
          </h1>

          <p className="text-gray-600 text-sm">
            Gerencie usuários, pesquisas e respostas do sistema.
          </p>
        </header>

        <StatsCards />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <PerformanceChart />
          <PieChartStats />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <RecentSurveys />
          <RecentResponses />
        </div>
      </section>
    </main>
  );
}