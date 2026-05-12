"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { dia: "01/05", respostas: 100 },
  { dia: "05/05", respostas: 250 },
  { dia: "10/05", respostas: 180 },
  { dia: "15/05", respostas: 320 },
];

export default function PerformanceChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-80">
      <h2 className="font-semibold mb-4">
        Desempenho das respostas
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="respostas"
            stroke="#2563eb"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}