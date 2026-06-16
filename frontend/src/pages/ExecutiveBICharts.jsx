import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Target,
  ShieldCheck,
  DatabaseZap,
  CalendarDays,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { getExecutiveBI } from "../api/executiveBiApi";
import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function ExecutiveBICharts() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;

  const [data, setData] = useState(null);

  const loadData = async () => {
    if (!organizationId) return;

    const res = await getExecutiveBI(organizationId);
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, [organizationId]);

  if (!organizationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
        Please create or select an organization first.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
        Loading Executive BI...
      </div>
    );
  }

  const cards = [
    ["Forecasts", data.summary_cards.total_forecasts],
    ["KPIs", data.summary_cards.total_kpis],
    ["Plans", data.summary_cards.total_plans],
    ["Approvals", data.summary_cards.total_approvals],
    ["Avg MAPE", `${data.summary_cards.average_mape}%`],
    ["Quality", `${data.summary_cards.average_quality_score}%`],
  ];

  const pieColors = ["#22c55e", "#facc15", "#ef4444", "#06b6d4"];

  const ChartCard = ({ title, icon: Icon, children }) => (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3">
        <Icon className="text-cyan-300" />
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <BarChart3 size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Executive BI Charts</h1>
              <p className="text-white/60">
                Executive forecasting, KPI, planning, approvals and data quality analytics.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-xl backdrop-blur-xl"
          >
            <p className="text-3xl font-black">{value}</p>
            <p className="text-xs text-white/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Forecast Financial Summary" icon={TrendingUp}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.forecast_financial_chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="KPI Status" icon={Target}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.kpi_status_chart}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {data.kpi_status_chart.map((_, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Approval Status" icon={ShieldCheck}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.approval_status_chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Planning Status" icon={CalendarDays}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.planning_status_chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Data Quality Status" icon={DatabaseZap}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.data_quality_chart}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {data.data_quality_chart.map((_, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}