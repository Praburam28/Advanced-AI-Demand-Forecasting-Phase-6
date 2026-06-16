import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCcw,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";
import { getApprovals, reviewApproval } from "../api/approvalApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function ForecastApprovals() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;
  const reviewerId = 1;

  const [approvals, setApprovals] = useState([]);

  const fetchApprovals = async () => {
    if (!organizationId) return;

    const res = await getApprovals(organizationId);
    setApprovals(res.data);
  };

  useEffect(() => {
    fetchApprovals();
  }, [organizationId]);

  const handleReview = async (id, status) => {
    await reviewApproval(id, {
      reviewed_by: Number(reviewerId),
      status,
      comments: `Forecast ${status}`,
    });

    fetchApprovals();
  };

  const getStatusStyle = (status) => {
    if (status === "approved") return "bg-emerald-400/10 text-emerald-300";
    if (status === "rejected") return "bg-red-400/10 text-red-300";
    if (status === "revision_required")
      return "bg-yellow-400/10 text-yellow-300";
    return "bg-cyan-400/10 text-cyan-300";
  };

  const getStatusIcon = (status) => {
    if (status === "approved") return <CheckCircle2 size={16} />;
    if (status === "rejected") return <XCircle size={16} />;
    if (status === "revision_required") return <RefreshCcw size={16} />;
    return <Clock size={16} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <ShieldCheck size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Forecast Approvals</h1>
              <p className="text-white/60">
                Review, approve, reject and track forecast submissions.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      <div className="grid gap-4">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-300">
                  <FileCheck2 size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-black">
                    Forecast #{item.forecast_id}
                  </h3>

                  <p className="text-sm text-white/50">
                    Submitted by User #{item.submitted_by}
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    {item.comments || "No comments added"}
                  </p>

                  <span
                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {getStatusIcon(item.status)}
                    {item.status}
                  </span>
                </div>
              </div>

              {item.status === "pending" && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleReview(item.id, "approved")}
                    className="rounded-2xl bg-emerald-500 px-4 py-3 font-bold text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReview(item.id, "revision_required")}
                    className="rounded-2xl bg-yellow-500 px-4 py-3 font-bold text-white"
                  >
                    Revision
                  </button>

                  <button
                    onClick={() => handleReview(item.id, "rejected")}
                    className="rounded-2xl bg-red-500 px-4 py-3 font-bold text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {approvals.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
            <ShieldCheck className="mx-auto mb-4 text-white/40" size={44} />
            <p className="font-bold">No forecast approvals found</p>
            <p className="text-sm text-white/50">
              Submitted forecasts will appear here for review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}