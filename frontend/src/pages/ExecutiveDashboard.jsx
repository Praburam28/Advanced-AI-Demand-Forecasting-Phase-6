import { useEffect, useState } from "react";
import API from "../api/api";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  BarChart3,
  BriefcaseBusiness,
  Sparkles,
  Target,
  Activity,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

const trendData = [
  { month: "Jan", revenue: 1200000, profit: 320000, cost: 880000 },
  { month: "Feb", revenue: 1450000, profit: 410000, cost: 1040000 },
  { month: "Mar", revenue: 1680000, profit: 520000, cost: 1160000 },
  { month: "Apr", revenue: 1820000, profit: 610000, cost: 1210000 },
  { month: "May", revenue: 2150000, profit: 760000, cost: 1390000 },
  { month: "Jun", revenue: 2460000, profit: 880000, cost: 1580000 },
];

const ExecutiveDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/executive/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.error("Failed to fetch executive dashboard", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const growthImpact = dashboard?.business_growth_impact || 0;

  const radialData = [
    {
      name: "Growth",
      value: Number(growthImpact),
      fill: "#8b5cf6",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-violet-900 to-fuchsia-700 p-8 text-white shadow-2xl shadow-violet-900/30">
        <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <BriefcaseBusiness size={16} />
              Executive Business Intelligence
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Executive Forecast Command Center
            </h1>

            <p className="text-white/75 mt-4 max-w-2xl">
              Track revenue, profit, cost, demand outlook, business performance,
              and growth impact using AI-powered forecasting intelligence.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                View Reports
              </button>

              <button className="bg-white/15 border border-white/25 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/25 transition">
                Generate Outlook
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 border border-white/15 rounded-[2rem] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Business Growth Impact</p>
                  <h2 className="text-5xl font-black mt-2">
                    {growthImpact}%
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Sparkles size={40} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Forecasts</p>
                  <p className="font-black mt-1">{dashboard?.forecast_count || 0}</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Reliability</p>
                  <p className="font-black mt-1">
                    {dashboard?.kpis?.forecast_reliability || "0%"}
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Efficiency</p>
                  <p className="font-black mt-1">
                    {dashboard?.kpis?.inventory_efficiency || "0%"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Revenue Forecast"
          value={`₹${dashboard?.revenue_forecast || 0}`}
          subtitle="Total forecasted revenue"
          icon={DollarSign}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Profit Forecast"
          value={`₹${dashboard?.profit_forecast || 0}`}
          subtitle="Total forecasted profit"
          icon={TrendingUp}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Cost Forecast"
          value={`₹${dashboard?.cost_forecast || 0}`}
          subtitle="Estimated operating cost"
          icon={Wallet}
          gradient="from-orange-500 to-rose-500"
        />

        <StatCard
          title="Growth Impact"
          value={`${growthImpact}%`}
          subtitle="Forecasting impact score"
          icon={BarChart3}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ChartCard
            title="Revenue, Profit & Cost Outlook"
            subtitle="Executive trend projection based on forecast cycles"
          >
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>

                    <linearGradient id="costColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.30} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#revenueColor)" strokeWidth={4} />
                  <Area type="monotone" dataKey="profit" stroke="#8b5cf6" fill="url(#profitColor)" strokeWidth={4} />
                  <Area type="monotone" dataKey="cost" stroke="#f97316" fill="url(#costColor)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Growth Score
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Forecasting impact on business growth
              </p>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <Target size={24} />
            </div>
          </div>

          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-center -mt-12">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">
              {growthImpact}%
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Business Growth Impact
            </p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Business Performance KPIs
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Executive-level forecasting metrics and operational indicators
            </p>
          </div>

          <button className="btn-secondary flex items-center gap-2">
            Export Summary
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
          {[
            {
              label: "Forecast Count",
              value: dashboard?.forecast_count || 0,
              icon: Activity,
              color: "from-cyan-500 to-blue-600",
            },
            {
              label: "Total Demand",
              value: dashboard?.total_predicted_demand || 0,
              icon: PieChart,
              color: "from-emerald-500 to-teal-500",
            },
            {
              label: "Forecast Reliability",
              value: dashboard?.kpis?.forecast_reliability || "0%",
              icon: Target,
              color: "from-violet-600 to-fuchsia-600",
            },
            {
              label: "Inventory Efficiency",
              value: dashboard?.kpis?.inventory_efficiency || "0%",
              icon: BarChart3,
              color: "from-orange-500 to-rose-500",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center`}
                >
                  <Icon size={22} />
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                  {item.label}
                </p>

                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {item.value}
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Forecasting Impact on Business Growth
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-6">
          This dashboard calculates executive-level business performance based
          on generated forecasts. Revenue, profit, cost and predicted demand are
          aggregated from forecasting history to support strategic planning,
          inventory decisions, and management-level reporting.
        </p>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;