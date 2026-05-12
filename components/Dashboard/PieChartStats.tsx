"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "ADS", value: 35 },
  { name: "Administração", value: 28 },
  { name: "Qualidade", value: 30 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

export default function PieChartStats() {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-80">
      <h2 className="font-semibold mb-4">
        Distribuição
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}