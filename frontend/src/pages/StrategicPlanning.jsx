import { useEffect, useState } from "react";
import {
  CalendarDays,
  Plus,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  getPlans,
  getPlanningSummary,
  createPlan,
} from "../api/planningApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function StrategicPlanning() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;
  const createdBy = 1;

  const [plans, setPlans] = useState([]);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    plan_name: "",
    plan_type: "annual",
    year: "2026",
    quarter: "",
    business_target: "",
    forecasted_demand: "",
    actual_demand: "",
  });

  const fetchData = async () => {
    if (!organizationId) return;

    const planRes = await getPlans(organizationId);
    const summaryRes = await getPlanningSummary(organizationId);

    setPlans(planRes.data);
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

    await createPlan({
      organization_id: Number(organizationId),
      plan_name: form.plan_name,
      plan_type: form.plan_type || "annual",
      year: Number(form.year || 2026),
      quarter: form.plan_type === "quarterly" ? form.quarter || null : null,
      business_target: Number(form.business_target || 0),
      forecasted_demand: Number(form.forecasted_demand || 0),
      actual_demand: Number(form.actual_demand || 0),
      created_by: Number(createdBy),
    });

    setForm({
      plan_name: "",
      plan_type: "annual",
      year: "2026",
      quarter: "",
      business_target: "",
      forecasted_demand: "",
      actual_demand: "",
    });

    fetchData();
  };

  const statusStyle = {
    on_track: "bg-emerald-400/10 text-emerald-300",
    at_risk: "bg-yellow-400/10 text-yellow-300",
    behind_target: "bg-red-400/10 text-red-300",
  };

  const statusIcon = {
    on_track: <CheckCircle2 size={16} />,
    at_risk: <AlertTriangle size={16} />,
    behind_target: <XCircle size={16} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <CalendarDays size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Strategic Planning</h1>
              <p className="text-white/60">
                Annual and quarterly planning with forecast vs business target tracking.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      {summary && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Total Plans", summary.total_plans],
            ["On Track", summary.on_track],
            ["At Risk", summary.at_risk],
            ["Behind", summary.behind_target],
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
              <h2 className="text-xl font-bold">Create Plan</h2>
              <p className="text-sm text-white/50">Annual or quarterly target</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="plan_name"
              value={form.plan_name}
              onChange={handleChange}
              placeholder="Plan Name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
              required
            />

            <select
              name="plan_type"
              value={form.plan_type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="annual">Annual</option>
              <option value="quarterly">Quarterly</option>
            </select>

            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            {form.plan_type === "quarterly" && (
              <select
                name="quarter"
                value={form.quarter}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
              >
                <option value="">Select Quarter</option>
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
            )}

            <input
              name="business_target"
              value={form.business_target}
              onChange={handleChange}
              placeholder="Business Target"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <input
              name="forecasted_demand"
              value={form.forecasted_demand}
              onChange={handleChange}
              placeholder="Forecasted Demand"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <input
              name="actual_demand"
              value={form.actual_demand}
              onChange={handleChange}
              placeholder="Actual Demand"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 py-4 font-bold shadow-xl">
              <Plus size={18} />
              Create Plan
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <TrendingUp className="text-cyan-300" />
            <div>
              <h2 className="text-xl font-bold">Planning Dashboard</h2>
              <p className="text-sm text-white/50">Forecast vs target performance</p>
            </div>
          </div>

          <div className="grid gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h3 className="text-lg font-black">{plan.plan_name}</h3>

                    <p className="mt-2 text-sm text-white/60">
                      {plan.recommendation || "No recommendation available"}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-4">
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Target</p>
                        <p className="font-bold">{plan.business_target}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Forecast</p>
                        <p className="font-bold">{plan.forecasted_demand}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Variance</p>
                        <p className="font-bold">{plan.variance}</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Achievement</p>
                        <p className="font-bold">{plan.achievement_percentage}%</p>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex h-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                      statusStyle[plan.status] || "bg-white/10 text-white"
                    }`}
                  >
                    {statusIcon[plan.status]}
                    {plan.status}
                  </span>
                </div>
              </div>
            ))}

            {plans.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
                <Target className="mx-auto mb-4 text-white/40" size={44} />
                <p className="font-bold">No strategic plans found</p>
                <p className="text-sm text-white/50">
                  Create annual or quarterly plans to track targets.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}