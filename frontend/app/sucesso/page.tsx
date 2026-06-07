import Header from "@/components/Header";
import SuccessCard from "@/components/SuccessCard";

export default function SucessoPage() {
  return (
    <main className="min-h-screen bg-[#EAF7FA] flex flex-col items-center px-6 py-8">
      <Header />

      <section className="flex flex-1 w-full items-center justify-center">
        <SuccessCard />
      </section>
    </main>
  );
}
