export default function RecentResponses() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-4">
        Respostas Recentes
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Pesquisa</th>
            <th>Curso</th>
            <th>Campus</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Pesquisa 1</td>
            <td>ADS</td>
            <td>Recife</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}