import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Target,
  CalendarDays,
  DatabaseZap,
  ShieldCheck,
  Workflow,
  AlertTriangle,
} from "lucide-react";
import { getExecutiveCommandSummary } from "../api/executiveCommandApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function ExecutiveCommandCenter() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;

  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    if (!organizationId) return;

    const res = await getExecutiveCommandSummary(organizationId);
    setSummary(res.data);
  };

  useEffect(() => {
    fetchSummary();
  }, [organizationId]);

  if (!organizationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
        Please create or select an organization first.
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
        Loading Executive Command Center...
      </div>
    );
  }

  const cards = [
    {
      title: "KPIs",
      icon: Target,
      value: summary.kpi_summary?.total_kpis || 0,
      detail: `${summary.kpi_summary?.critical || 0} Critical`,
    },
    {
      title: "Planning",
      icon: CalendarDays,
      value: `${summary.planning_summary?.average_achievement || 0}%`,
      detail: "Average Achievement",
    },
    {
      title: "Data Quality",
      icon: DatabaseZap,
      value: `${summary.data_quality_summary?.average_quality_score || 0}%`,
      detail: `${summary.data_quality_summary?.poor || 0} Poor Dataset(s)`,
    },
    {
      title: "Approvals",
      icon: ShieldCheck,
      value: summary.approval_summary?.pending || 0,
      detail: "Pending Approvals",
    },
    {
      title: "Workflows",
      icon: Workflow,
      value: summary.workflow_summary?.active_workflows || 0,
      detail: `${summary.workflow_summary?.failed_executions || 0} Failed`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <BriefcaseBusiness size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Executive Command Center</h1>
              <p className="text-white/60">
                Organization-wide forecasting, planning, KPI, workflow and alert overview.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-300">
                <Icon size={24} />
              </div>

              <p className="text-3xl font-black">{card.value}</p>
              <p className="mt-1 text-sm font-bold">{card.title}</p>
              <p className="text-xs text-white/50">{card.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <AlertTriangle className="text-yellow-300" />
          <div>
            <h2 className="text-xl font-bold">Executive Alerts</h2>
            <p className="text-sm text-white/50">
              Critical business signals requiring attention
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {summary.executive_alerts?.length > 0 ? (
            summary.executive_alerts.map((alert, index) => (
              <div
                key={index}
                className="rounded-3xl border border-yellow-300/20 bg-yellow-400/10 p-5 text-yellow-100"
              >
                {alert}
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5 text-emerald-200">
              No critical executive alerts. Organization performance is stable.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}