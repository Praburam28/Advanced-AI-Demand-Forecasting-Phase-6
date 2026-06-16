import {
  Database,
  LineChart,
  FileText,
  TrendingUp,
  Brain,
  Sparkles,
  Rocket,
  Target,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";

const forecastData = [
  { month: "Jan", demand: 1200, forecast: 1300, revenue: 120000 },
  { month: "Feb", demand: 1400, forecast: 1450, revenue: 145000 },
  { month: "Mar", demand: 1600, forecast: 1700, revenue: 170000 },
  { month: "Apr", demand: 1800, forecast: 1850, revenue: 190000 },
  { month: "May", demand: 2100, forecast: 2200, revenue: 225000 },
  { month: "Jun", demand: 2400, forecast: 2500, revenue: 260000 },
];

const categoryData = [
  { category: "Electronics", demand: 3400 },
  { category: "Fashion", demand: 2800 },
  { category: "Grocery", demand: 4200 },
  { category: "Appliances", demand: 1900 },
];

const aiCards = [
  {
    title: "High Growth Detected",
    text: "Electronics demand is projected to grow by 24% next cycle.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    title: "AI Recommendation",
    text: "Increase inventory for Grocery and Electronics before peak season.",
    icon: Brain,
    gradient: "from-fuchsia-500 to-violet-600",
  },
  {
    title: "Forecast Accuracy",
    text: "Random Forest model is performing better than baseline models.",
    icon: Target,
    gradient: "from-orange-500 to-rose-500",
  },
];

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 p-8 text-white shadow-2xl shadow-fuchsia-500/30">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-300/30 blur-2xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-xl">
              <Sparkles size={16} />
              AI Forecast Intelligence
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Smart Demand Forecasting Dashboard
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Monitor datasets, forecasts, reports, revenue growth, AI insights,
              model accuracy, and business performance from one premium dashboard.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Generate Forecast
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                Upload Dataset
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Business Growth Score</p>
                  <h2 className="text-5xl font-black mt-2">92%</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Revenue</p>
                  <p className="font-bold mt-1">₹26L</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Profit</p>
                  <p className="font-bold mt-1">₹8.5L</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Accuracy</p>
                  <p className="font-bold mt-1">94%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard title="Datasets" value="24" subtitle="Uploaded business files" icon={Database} gradient="from-cyan-500 to-blue-600" />
        <StatCard title="Forecasts" value="58" subtitle="Generated predictions" icon={LineChart} gradient="from-violet-600 to-fuchsia-600" />
        <StatCard title="Reports" value="17" subtitle="Executive reports" icon={FileText} gradient="from-orange-500 to-rose-500" />
        <StatCard title="Growth Impact" value="18.5%" subtitle="Projected improvement" icon={TrendingUp} gradient="from-emerald-500 to-teal-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {aiCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br ${item.gradient} shadow-xl`}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-white/80 mt-2">{item.text}</p>
                </div>

                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ChartCard title="Demand vs Forecast Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" fill="url(#forecastGradient)" strokeWidth={4} />
                <Line type="monotone" dataKey="demand" stroke="#06b6d4" strokeWidth={4} dot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue Growth">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#ec4899" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <ChartCard title="Category Demand">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="demand" fill="#06b6d4" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Demand Mix
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Category-wise demand distribution
          </p>

          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="demand" nameKey="category" outerRadius={95} innerRadius={55} paddingAngle={4}>
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {categoryData.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span>{item.category}</span>
                </div>

                <span className="font-bold">{item.demand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Recent Forecast Activity
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Latest actions across forecasting workspace
            </p>
          </div>

          <button className="btn-secondary flex items-center gap-2">
            View All
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {[
            "Random Forest forecast generated for Electronics category",
            "Executive report exported in PDF format",
            "New dataset version uploaded for sales_forecasting.csv",
            "Scenario comparison completed for Q2 planning",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4"
            >
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white flex items-center justify-center">
                <Activity size={18} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {item}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Recently updated
                </p>
              </div>

              <span className="badge bg-emerald-100 text-emerald-700">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;