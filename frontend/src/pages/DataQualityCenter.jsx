import { useEffect, useState } from "react";
import {
  DatabaseZap,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
} from "lucide-react";
import {
  getDataQuality,
  getDataQualitySummary,
} from "../api/dataQualityApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function DataQualityCenter() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchData = async () => {
    if (!organizationId) return;

    const recordsRes = await getDataQuality(organizationId);
    const summaryRes = await getDataQualitySummary(organizationId);

    setRecords(recordsRes.data);
    setSummary(summaryRes.data);
  };

  useEffect(() => {
    fetchData();
  }, [organizationId]);

  const statusStyle = {
    good: "bg-emerald-400/10 text-emerald-300",
    warning: "bg-yellow-400/10 text-yellow-300",
    poor: "bg-red-400/10 text-red-300",
    pending: "bg-cyan-400/10 text-cyan-300",
  };

  const statusIcon = {
    good: <CheckCircle2 size={16} />,
    warning: <AlertTriangle size={16} />,
    poor: <XCircle size={16} />,
    pending: <ShieldAlert size={16} />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <DatabaseZap size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Data Quality Center</h1>
              <p className="text-white/60">
                Monitor dataset completeness, duplicates, missing values and quality scores.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      {summary && (
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Average Score", `${summary.average_score}%`],
            ["Datasets Checked", summary.total_datasets_checked],
            ["Good", summary.good],
            ["Warning", summary.warning],
            ["Poor", summary.poor],
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
          <BarChart3 className="text-cyan-300" />
          <div>
            <h2 className="text-xl font-bold">Dataset Validation Records</h2>
            <p className="text-sm text-white/50">
              Quality metrics generated from uploaded datasets
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {records.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h3 className="text-lg font-black">
                    Dataset #{item.dataset_id}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">
                    {item.validation_summary || "No validation summary"}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <p className="text-xs text-white/40">Rows</p>
                      <p className="font-bold">{item.total_rows}</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-3">
                      <p className="text-xs text-white/40">Columns</p>
                      <p className="font-bold">{item.total_columns}</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-3">
                      <p className="text-xs text-white/40">Missing</p>
                      <p className="font-bold">{item.missing_values}</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-3">
                      <p className="text-xs text-white/40">Duplicates</p>
                      <p className="font-bold">{item.duplicate_rows}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-4xl font-black">{item.quality_score}%</p>

                  <span
                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                      statusStyle[item.status] || "bg-white/10 text-white"
                    }`}
                  >
                    {statusIcon[item.status]}
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {records.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
              <DatabaseZap className="mx-auto mb-4 text-white/40" size={44} />
              <p className="font-bold">No data quality records found</p>
              <p className="text-sm text-white/50">
                Dataset validation results will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}