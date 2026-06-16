import { useEffect, useState } from "react";
import API from "../api/api";
import {
  BarChart3,
  Target,
  TrendingUp,
  FileText,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

const AccuracyCenter = () => {
  const [dashboard, setDashboard] = useState(null);
  const [comparison, setComparison] = useState([]);

  const fetchAccuracyData = async () => {
    try {
      const dashboardRes = await API.get("/accuracy/dashboard");
      const comparisonRes = await API.get("/accuracy/model-comparison");

      setDashboard(dashboardRes.data.data || dashboardRes.data);
      setComparison(comparisonRes.data.data || comparisonRes.data);
    } catch (error) {
      console.error("Failed to fetch accuracy data", error);
    }
  };

  useEffect(() => {
    fetchAccuracyData();
  }, []);

  const averageAccuracy = Number(dashboard?.average_accuracy || 0);

  const radialData = [
    {
      name: "Accuracy",
      value: averageAccuracy,
      fill: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Accuracy Center
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Model performance dashboard, accuracy trends and evaluation reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Best Model"
          value={dashboard?.best_model || "N/A"}
          subtitle="Highest accuracy model"
          icon={Target}
          gradient="from-purple-600 to-fuchsia-600"
        />

        <StatCard
          title="Average Accuracy"
          value={`${averageAccuracy}%`}
          subtitle="Across all forecasts"
          icon={TrendingUp}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Average MAPE"
          value={`${dashboard?.average_mape || 0}%`}
          subtitle="Lower is better"
          icon={BarChart3}
          gradient="from-orange-500 to-red-500"
        />

        <StatCard
          title="Models Compared"
          value={dashboard?.model_count || 0}
          subtitle="ML model count"
          icon={FileText}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ChartCard
            title="Model Accuracy Comparison"
            subtitle="Average accuracy by forecasting model"
          >
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparison}
                  margin={{ top: 30, right: 30, left: 10, bottom: 20 }}
                >
                  <XAxis
                    dataKey="model_name"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="average_accuracy"
                    fill="#8b5cf6"
                    radius={[14, 14, 0, 0]}
                    barSize={80}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="card p-6 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Accuracy Score
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Overall forecasting quality
              </p>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
          </div>

          <div className="relative h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="90%"
                barSize={26}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  clockWise
                  dataKey="value"
                  cornerRadius={20}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-black text-slate-900 dark:text-white">
                {averageAccuracy}%
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Average Accuracy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-black text-slate-900 dark:text-white">
            Model Performance Comparison
          </h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="text-left p-4">Model</th>
              <th className="text-left p-4">Avg Accuracy</th>
              <th className="text-left p-4">Avg MAPE</th>
              <th className="text-left p-4">Avg RMSE</th>
            </tr>
          </thead>

          <tbody>
            {comparison.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-slate-500">
                  Generate forecasts to view model comparison.
                </td>
              </tr>
            ) : (
              comparison.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-200 dark:border-slate-800"
                >
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    {item.model_name}
                  </td>
                  <td className="p-4">{item.average_accuracy}%</td>
                  <td className="p-4">{item.average_mape}%</td>
                  <td className="p-4">{item.average_rmse}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccuracyCenter;