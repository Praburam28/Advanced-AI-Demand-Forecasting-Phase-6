import {
  Plug,
  Database,
  Cloud,
  FileSpreadsheet,
  Sparkles,
  Server,
  Settings,
  CheckCircle,
  XCircle,
  Activity,
  Rocket,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import StatCard from "../components/StatCard";

const integrations = [
  {
    name: "MySQL Database",
    description: "Connect business sales and inventory database",
    status: "Connected",
    icon: Database,
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    name: "Cloud Storage",
    description: "Sync uploaded datasets and generated reports",
    status: "Not Connected",
    icon: Cloud,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Excel Import",
    description: "Import business datasets from Excel files",
    status: "Connected",
    icon: FileSpreadsheet,
    gradient: "from-violet-600 to-fuchsia-600",
  },
  {
    name: "BI Connector",
    description: "Connect dashboards with external BI platforms",
    status: "Not Connected",
    icon: BarChart3,
    gradient: "from-orange-500 to-rose-500",
  },
];

const Integrations = () => {
  const connectedCount = integrations.filter(
    (item) => item.status === "Connected"
  ).length;

  const pendingCount = integrations.length - connectedCount;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl shadow-cyan-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Plug size={16} />
              Integration Hub
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Connect Data Sources & Business Tools
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Manage database, Excel, cloud, BI, and business platform
              integrations to power forecasting workflows and executive reports.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-cyan-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Add Integration
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                API Settings
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Connected Services</p>
                  <h2 className="text-5xl font-black mt-2">
                    {connectedCount}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Total</p>
                  <p className="font-black mt-1">{integrations.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Active</p>
                  <p className="font-black mt-1">{connectedCount}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Pending</p>
                  <p className="font-black mt-1">{pendingCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Integrations"
          value={integrations.length}
          subtitle="Available connectors"
          icon={Plug}
          gradient="from-cyan-500 to-blue-600"
        />

        <StatCard
          title="Connected"
          value={connectedCount}
          subtitle="Active integrations"
          icon={CheckCircle}
          gradient="from-emerald-500 to-teal-500"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Need configuration"
          icon={XCircle}
          gradient="from-orange-500 to-rose-500"
        />

        <StatCard
          title="Data Security"
          value="Enabled"
          subtitle="Secure connection workflow"
          icon={ShieldCheck}
          gradient="from-violet-600 to-fuchsia-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {integrations.map((item, index) => {
          const Icon = item.icon;
          const isConnected = item.status === "Connected";

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-white/70 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/70 dark:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-2xl`}
              />

              <div
                className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shadow-lg`}
              >
                <Icon size={26} />
              </div>

              <h3 className="relative font-black text-slate-900 dark:text-white mt-5">
                {item.name}
              </h3>

              <p className="relative text-sm text-slate-500 dark:text-slate-400 mt-2 leading-6">
                {item.description}
              </p>

              <div className="relative flex items-center justify-between mt-6">
                <span
                  className={`badge ${
                    isConnected
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {item.status}
                </span>

                <button className="text-violet-600 dark:text-violet-300 font-bold text-sm flex items-center gap-1">
                  <Settings size={15} />
                  Configure
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Integration Activity
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Recent integration status updates and connector activity.
            </p>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
            <Activity size={22} />
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            {
              title: "MySQL sales database connected successfully.",
              type: "Connected",
              icon: Database,
              gradient: "from-emerald-500 to-cyan-500",
            },
            {
              title: "Excel import module enabled for dataset uploads.",
              type: "Enabled",
              icon: FileSpreadsheet,
              gradient: "from-violet-600 to-fuchsia-600",
            },
            {
              title: "Cloud storage integration pending configuration.",
              type: "Pending",
              icon: Cloud,
              gradient: "from-orange-500 to-rose-500",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-4"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center`}
                >
                  <Icon size={22} />
                </div>

                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Recently updated
                  </p>
                </div>

                <span className="badge bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
                  {item.type}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-cyan-950 to-violet-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Server size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              Integration Layer Ready
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports database connections, cloud storage planning, Excel imports,
              BI connectors, and API-ready external integrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;