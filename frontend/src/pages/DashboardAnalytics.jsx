import { useEffect, useState } from "react";
import API from "../api/api";
import {
  BarChart3,
  Filter,
  RefreshCcw,
  TrendingUp,
  Wallet,
  Package,
  Database,
  Sparkles,
  Rocket,
  Layers,
  Activity,
  PieChart,
  Settings,
  Map,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

const DashboardAnalytics = () => {
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [filters, setFilters] = useState({
    project_id: "",
    region: "",
    category: "",
    start_date: "",
    end_date: "",
  });

  const fetchProjects = async () => {
    const res = await API.get("/workspaces/");
    setProjects(res.data);
  };

  const fetchAnalytics = async () => {
    const payload = {
      project_id: filters.project_id ? Number(filters.project_id) : null,
      region: filters.region || null,
      category: filters.category || null,
      start_date: filters.start_date || null,
      end_date: filters.end_date || null,
    };

    const res = await API.post("/dashboard/analytics", payload);
    setAnalytics(res.data.data);
  };

  useEffect(() => {
    fetchProjects();
    fetchAnalytics();
  }, []);

  const resetFilters = () => {
    setFilters({
      project_id: "",
      region: "",
      category: "",
      start_date: "",
      end_date: "",
    });
  };

  const actuals = analytics?.actuals || {};
  const forecasts = analytics?.forecasts || {};
  const breakdowns = analytics?.breakdowns || {};

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-violet-700 to-fuchsia-600 p-8 text-white shadow-2xl shadow-violet-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <BarChart3 size={16} />
              Cross-Filtering Analytics
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Interactive Business Analytics
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Filter revenue, profit, units, forecasts and business breakdowns
              by project, region, category and date range using cross-filtering
              analytics.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={fetchAnalytics}
                className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
              >
                Apply Filters
              </button>

              <button
                onClick={resetFilters}
                className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Actual Revenue</p>
                  <h2 className="text-5xl font-black mt-2">
                    ₹{actuals.total_revenue || 0}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Profit</p>
                  <p className="font-black mt-1">
                    ₹{actuals.total_profit || 0}
                  </p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Units</p>
                  <p className="font-black mt-1">
                    {actuals.total_units || 0}
                  </p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Datasets</p>
                  <p className="font-black mt-1">
                    {actuals.dataset_count || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center">
            <Filter size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Analytics Filters
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Filter analytics by project, region, category and date range.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <select
            value={filters.project_id}
            onChange={(e) =>
              setFilters({ ...filters, project_id: e.target.value })
            }
            className="input"
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            value={filters.region}
            onChange={(e) =>
              setFilters({ ...filters, region: e.target.value })
            }
            className="input"
          >
            <option value="">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="Central">Central</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="input"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Fashion">Fashion</option>
            <option value="Appliances">Appliances</option>
          </select>

          <input
            type="date"
            value={filters.start_date}
            onChange={(e) =>
              setFilters({ ...filters, start_date: e.target.value })
            }
            className="input"
          />

          <input
            type="date"
            value={filters.end_date}
            onChange={(e) =>
              setFilters({ ...filters, end_date: e.target.value })
            }
            className="input"
          />

          <div className="flex gap-2">
            <button
              onClick={fetchAnalytics}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Sparkles size={17} />
              Apply
            </button>

            <button
              onClick={resetFilters}
              className="btn-secondary px-4 flex items-center justify-center"
            >
              <RefreshCcw size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Actuals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Actual Revenue"
          value={`₹${actuals.total_revenue || 0}`}
          subtitle="Filtered dataset revenue"
          icon={Wallet}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Actual Profit"
          value={`₹${actuals.total_profit || 0}`}
          subtitle="Filtered dataset profit"
          icon={TrendingUp}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Units Sold"
          value={actuals.total_units || 0}
          subtitle="Filtered demand volume"
          icon={Package}
          gradient="from-orange-500 to-rose-500"
        />

        <StatCard
          title="Datasets"
          value={actuals.dataset_count || 0}
          subtitle="Datasets included"
          icon={Database}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <Wallet size={32} />
          <h3 className="font-black text-xl mt-4">Forecast Revenue</h3>
          <p className="text-3xl font-black mt-2">
            ₹{forecasts.forecast_revenue || 0}
          </p>
          <p className="text-sm text-white/75 mt-2">
            Projected filtered revenue
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <TrendingUp size={32} />
          <h3 className="font-black text-xl mt-4">Forecast Profit</h3>
          <p className="text-3xl font-black mt-2">
            ₹{forecasts.forecast_profit || 0}
          </p>
          <p className="text-sm text-white/75 mt-2">
            Projected filtered profit
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <Package size={32} />
          <h3 className="font-black text-xl mt-4">Forecast Demand</h3>
          <p className="text-3xl font-black mt-2">
            {forecasts.forecast_demand || 0}
          </p>
          <p className="text-sm text-white/75 mt-2">
            Projected demand volume
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
          <Filter size={32} />
          <h3 className="font-black text-xl mt-4">Cross Filtering</h3>
          <p className="text-sm text-white/75 mt-2">
            Apply project, region, category and date filters across dashboard metrics.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <Layers size={32} />
          <h3 className="font-black text-xl mt-4">Saved Layouts</h3>
          <p className="text-sm text-white/75 mt-2">
            Dashboard layout saving support is ready for personalized analytics.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <Activity size={32} />
          <h3 className="font-black text-xl mt-4">Drill-Down Analytics</h3>
          <p className="text-sm text-white/75 mt-2">
            Drill into category, region and monthly business performance.
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ChartCard
          title="Revenue by Category"
          subtitle="Category-wise business revenue breakdown"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdowns.category_breakdown || []}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  fill="#8b5cf6"
                  radius={[12, 12, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Revenue by Region"
          subtitle="Regional revenue performance comparison"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdowns.region_breakdown || []}>
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  fill="#06b6d4"
                  radius={[12, 12, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard
        title="Monthly Revenue Trend"
        subtitle="Revenue and unit movement across filtered months"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={breakdowns.monthly_trend || []}>
              <defs>
                <linearGradient id="revenueTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="unitsTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fill="url(#revenueTrend)"
                strokeWidth={4}
              />

              <Line
                type="monotone"
                dataKey="units"
                stroke="#06b6d4"
                strokeWidth={4}
                dot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-blue-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Settings size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              Dashboard Enhancement Module Ready
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports customizable widgets, dashboard filters, drill-down analytics,
              cross-filtering, region/category breakdowns, and saved-layout readiness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;