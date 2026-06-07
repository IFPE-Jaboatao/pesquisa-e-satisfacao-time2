import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex items-center justify-center md:justify-start gap-3">
        <Image
          src="/imagens/logo-icon.png"
          alt="Avalia Plus"
          width={50}
          height={50}
          className="md:w-16 md:h-16"
        />
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-blue-700 leading-none">Avalia-Plus</h1>
          <p className="text-gray-600">Sistema de Pesquisa de Satisfação</p>
        </div>
      </div>

      <div className="w-full md:w-auto bg-cyan-50 border border-cyan-200 rounded-xl p-3">
        <p className="font-semibold text-sm">Respostas anônimas</p>

        <p className="text-xs text-gray-600">
          Nenhuma informação pessoal será identificada.
        </p>
      </div>
    </header>
  );
}
