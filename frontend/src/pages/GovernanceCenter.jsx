import { useEffect, useState } from "react";
import {
  GitBranch,
  ShieldCheck,
  Clock3,
  FileClock,
  CheckCircle2,
  XCircle,
  Archive,
} from "lucide-react";
import {
  getGovernanceRecords,
  getGovernanceSummary,
} from "../api/governanceApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function GovernanceCenter() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchData = async () => {
    if (!organizationId) return;

    const recordsRes = await getGovernanceRecords(organizationId);
    const summaryRes = await getGovernanceSummary(organizationId);

    setRecords(recordsRes.data);
    setSummary(summaryRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [organizationId]);

  const statusStyle = {
    draft: "bg-slate-400/10 text-slate-300",
    submitted: "bg-cyan-400/10 text-cyan-300",
    approved: "bg-emerald-400/10 text-emerald-300",
    rejected: "bg-red-400/10 text-red-300",
    archived: "bg-purple-400/10 text-purple-300",
  };

  const statusIcon = {
    draft: <FileClock size={16} />,
    submitted: <Clock3 size={16} />,
    approved: <CheckCircle2 size={16} />,
    rejected: <XCircle size={16} />,
    archived: <Archive size={16} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <GitBranch size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Forecast Governance Center</h1>
              <p className="text-white/60">
                Track forecast versions, lifecycle status, modifications and approvals.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      {summary && (
        <div className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {[
            ["Total", summary.total_records],
            ["Draft", summary.draft],
            ["Submitted", summary.submitted],
            ["Approved", summary.approved],
            ["Rejected", summary.rejected],
            ["Archived", summary.archived],
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

      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-3">
          <ShieldCheck className="text-cyan-300" />
          <div>
            <h2 className="text-xl font-bold">Governance Records</h2>
            <p className="text-sm text-white/50">
              Forecast lifecycle and version history
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {records.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-black">
                    Forecast #{item.forecast_id} — {item.version}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    {item.change_summary || "No change summary available"}
                  </p>

                  <p className="mt-2 text-xs text-white/40">
                    Modified by User #{item.modified_by || "N/A"}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                    statusStyle[item.lifecycle_status] ||
                    "bg-white/10 text-white"
                  }`}
                >
                  {statusIcon[item.lifecycle_status]}
                  {item.lifecycle_status}
                </span>
              </div>
            </div>
          ))}

          {records.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
              <GitBranch className="mx-auto mb-4 text-white/40" size={44} />
              <p className="font-bold">No governance records found</p>
              <p className="text-sm text-white/50">
                Forecast lifecycle records will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}