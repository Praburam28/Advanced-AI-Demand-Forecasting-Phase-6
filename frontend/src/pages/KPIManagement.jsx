import { useEffect, useState } from "react";
import {
  Target,
  Plus,
  Trash2,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  getKPIs,
  getKPISummary,
  createKPI,
  deleteKPI,
} from "../api/kpiApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function KPIManagement() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;
  const createdBy = 1;

  const [kpis, setKpis] = useState([]);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    target_value: "",
    actual_value: "",
    forecast_value: "",
    unit: "",
    period: "monthly",
    alert_threshold: "",
  });

  const fetchData = async () => {
    if (!organizationId) return;

    const kpiRes = await getKPIs(organizationId);
    const summaryRes = await getKPISummary(organizationId);

    setKpis(kpiRes.data);
    setSummary(summaryRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [organizationId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!organizationId) {
      alert("Please create or select an organization first");
      return;
    }

    await createKPI({
      organization_id: Number(organizationId),
      name: form.name,
      description: form.description || null,
      target_value: Number(form.target_value || 0),
      actual_value: Number(form.actual_value || 0),
      forecast_value: Number(form.forecast_value || 0),
      unit: form.unit || null,
      period: form.period || "monthly",
      alert_threshold: form.alert_threshold
        ? Number(form.alert_threshold)
        : null,
      created_by: Number(createdBy),
    });

    setForm({
      name: "",
      description: "",
      target_value: "",
      actual_value: "",
      forecast_value: "",
      unit: "",
      period: "monthly",
      alert_threshold: "",
    });

    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteKPI(id);
    fetchData();
  };

  const statusStyle = {
    on_track: "bg-emerald-400/10 text-emerald-300",
    warning: "bg-yellow-400/10 text-yellow-300",
    critical: "bg-red-400/10 text-red-300",
  };

  const statusIcon = {
    on_track: <CheckCircle2 size={16} />,
    warning: <AlertTriangle size={16} />,
    critical: <XCircle size={16} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Target size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">KPI Management</h1>
              <p className="text-white/60">
                Create custom KPIs, track targets, forecast comparison and alert thresholds.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      {summary && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Total KPIs", summary.total_kpis],
            ["On Track", summary.on_track],
            ["Warning", summary.warning],
            ["Critical", summary.critical],
            ["Avg Achievement", `${summary.average_achievement}%`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/10 p-5 text-center shadow-xl backdrop-blur-xl"
            >
              <p className="text-3xl font-black">{value}</p>
              <p className="text-xs text-white/50">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreate}
          className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create KPI</h2>
              <p className="text-sm text-white/50">Define business metric</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="KPI Name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <input
              name="target_value"
              value={form.target_value}
              onChange={handleChange}
              placeholder="Target Value"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <input
              name="actual_value"
              value={form.actual_value}
              onChange={handleChange}
              placeholder="Actual Value"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <input
              name="forecast_value"
              value={form.forecast_value}
              onChange={handleChange}
              placeholder="Forecast Value"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <input
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="Unit e.g. %, units, ₹"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <select
              name="period"
              value={form.period}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>

            <input
              name="alert_threshold"
              value={form.alert_threshold}
              onChange={handleChange}
              placeholder="Alert Threshold %"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 py-4 font-bold shadow-xl">
              <Plus size={18} />
              Create KPI
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <Activity className="text-cyan-300" />
            <div>
              <h2 className="text-xl font-bold">KPI Directory</h2>
              <p className="text-sm text-white/50">
                Business performance indicators
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.id}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h3 className="text-lg font-black">{kpi.name}</h3>
                    <p className="mt-2 text-sm text-white/60">
                      {kpi.description || "No description"}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Target</p>
                        <p className="font-bold">
                          {kpi.target_value} {kpi.unit || ""}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Actual</p>
                        <p className="font-bold">
                          {kpi.actual_value} {kpi.unit || ""}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Forecast</p>
                        <p className="font-bold">
                          {kpi.forecast_value} {kpi.unit || ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                        statusStyle[kpi.status] || "bg-white/10 text-white"
                      }`}
                    >
                      {statusIcon[kpi.status]}
                      {kpi.status}
                    </span>

                    <button
                      onClick={() => handleDelete(kpi.id)}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {kpis.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
                <Target className="mx-auto mb-4 text-white/40" size={44} />
                <p className="font-bold">No KPIs found</p>
                <p className="text-sm text-white/50">
                  Create your first KPI to track business performance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}