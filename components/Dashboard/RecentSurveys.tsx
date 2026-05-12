export default function RecentSurveys() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-4">
        Pesquisas Recentes
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Respostas</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Pesquisa 1</td>
            <td>Ativa</td>
            <td>320</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}