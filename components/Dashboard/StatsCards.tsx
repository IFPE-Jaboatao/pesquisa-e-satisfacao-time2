export default function StatsCards() {
  const stats = [
    ["Pesquisas Ativas", "12"],
    ["Respostas Recebidas", "1248"],
    ["Participações Hoje", "86"],
    ["Período", "01/01/26 - 31/06/26"],
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(([title, value]) => (
        <div
          key={title}
          className="bg-white p-4 rounded-lg shadow"
        >
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>
      ))}
    </div>
  );
}