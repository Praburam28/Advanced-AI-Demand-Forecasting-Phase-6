import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function KPITrendChart({ data }) {
  return (
    <div className="h-[450px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="period" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="actual_value"
            stroke="#22c55e"
            strokeWidth={3}
            name="Actual"
          />

          <Line
            type="monotone"
            dataKey="forecast_value"
            stroke="#06b6d4"
            strokeWidth={3}
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}