import SuccessCard from "@/components/SuccessCard";

export default function SucessoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-black text-2xl font-semibold mb-6">
        Pesquisa de Satisfação
      </h1>

      <SuccessCard />
    </main>
  );
}