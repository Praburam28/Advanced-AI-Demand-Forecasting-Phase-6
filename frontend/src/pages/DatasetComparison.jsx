import { useEffect, useState } from "react";
import API from "../api/api";
import {
  GitCompare,
  Database,
  PlusCircle,
  MinusCircle,
  BarChart3,
  FileSpreadsheet,
  Sparkles,
  Rocket,
  Layers,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  ArrowRightLeft,
} from "lucide-react";

import StatCard from "../components/StatCard";

const DatasetComparison = () => {
  const [datasets, setDatasets] = useState([]);
  const [versions, setVersions] = useState([]);
  const [comparison, setComparison] = useState(null);

  const [form, setForm] = useState({
    dataset_id: "",
    version_1: "",
    version_2: "",
  });

  const fetchDatasets = async () => {
    try {
      const res = await API.get("/datasets/");
      setDatasets(res.data);
    } catch (error) {
      console.error("Failed to fetch datasets", error);
    }
  };

  const fetchVersions = async (datasetId) => {
    if (!datasetId) return;

    try {
      const res = await API.get(`/datasets/${datasetId}/versions`);
      setVersions(res.data);
    } catch (error) {
      alert("Failed to fetch dataset versions");
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const compareDatasets = async (e) => {
    e.preventDefault();

    if (!form.dataset_id || !form.version_1 || !form.version_2) {
      alert("Dataset and both versions are required");
      return;
    }

    try {
      const res = await API.post("/dataset-comparison/", {
        dataset_id: Number(form.dataset_id),
        version_1: Number(form.version_1),
        version_2: Number(form.version_2),
      });

      setComparison(res.data.data);
    } catch (error) {
      alert("Dataset comparison failed");
    }
  };

  const numericChanges = comparison?.numeric_changes || [];

  const selectedDataset = datasets.find(
    (dataset) => String(dataset.id) === String(form.dataset_id)
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl shadow-cyan-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <GitCompare size={16} />
              Dataset Version Intelligence
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Compare Dataset Versions
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Compare rows, columns, schema changes and numeric trends between
              dataset versions before using them for forecasting.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={compareDatasets}
                className="bg-white text-cyan-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
              >
                Compare Versions
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View Dataset History
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Selected Dataset</p>
                  <h2 className="text-4xl font-black mt-2 truncate">
                    {selectedDataset?.name || "None"}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Datasets</p>
                  <p className="font-black mt-1">{datasets.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Versions</p>
                  <p className="font-black mt-1">{versions.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Status</p>
                  <p className="font-black mt-1">
                    {comparison ? "Compared" : "Ready"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={compareDatasets} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
            <ArrowRightLeft size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Compare Dataset Versions
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select a dataset and choose two versions for comparison.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={form.dataset_id}
            onChange={(e) => {
              setForm({
                dataset_id: e.target.value,
                version_1: "",
                version_2: "",
              });
              fetchVersions(e.target.value);
              setComparison(null);
            }}
            className="input"
          >
            <option value="">Select Dataset</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                #{dataset.id} - {dataset.name}
              </option>
            ))}
          </select>

          <select
            value={form.version_1}
            onChange={(e) =>
              setForm({ ...form, version_1: e.target.value })
            }
            className="input"
          >
            <option value="">Version 1</option>
            {versions.map((version) => (
              <option key={version.id} value={version.version_number}>
                v{version.version_number}
              </option>
            ))}
          </select>

          <select
            value={form.version_2}
            onChange={(e) =>
              setForm({ ...form, version_2: e.target.value })
            }
            className="input"
          >
            <option value="">Version 2</option>
            {versions.map((version) => (
              <option key={version.id} value={version.version_number}>
                v{version.version_number}
              </option>
            ))}
          </select>

          <button className="btn-primary flex items-center justify-center gap-2">
            <GitCompare size={18} />
            Compare
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Dataset"
          value={comparison?.dataset_name || "None"}
          subtitle="Selected dataset"
          icon={Database}
          gradient="from-cyan-500 to-blue-600"
        />

        <StatCard
          title="Row Difference"
          value={comparison?.row_difference ?? 0}
          subtitle="Change between versions"
          icon={FileSpreadsheet}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Added Columns"
          value={comparison?.added_columns?.length || 0}
          subtitle="New schema fields"
          icon={PlusCircle}
          gradient="from-emerald-500 to-teal-500"
        />

        <StatCard
          title="Removed Columns"
          value={comparison?.removed_columns?.length || 0}
          subtitle="Deleted schema fields"
          icon={MinusCircle}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      {comparison && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
                  <Layers size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Structure Summary
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Row and column level comparison.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Version {comparison.version_1} Rows
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                    {comparison.rows_version_1}
                  </p>
                </div>

                <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Version {comparison.version_2} Rows
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                    {comparison.rows_version_2}
                  </p>
                </div>

                <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Version {comparison.version_1} Columns
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                    {comparison.columns_version_1}
                  </p>
                </div>

                <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-3xl p-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Version {comparison.version_2} Columns
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                    {comparison.columns_version_2}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
                  <Sparkles size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Column Changes
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Added, removed and common schema fields.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 p-5">
                  <p className="font-black text-emerald-700 dark:text-emerald-300">
                    Added Columns
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {comparison.added_columns.length
                      ? comparison.added_columns.join(", ")
                      : "No added columns"}
                  </p>
                </div>

                <div className="rounded-3xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/40 p-5">
                  <p className="font-black text-rose-700 dark:text-rose-300">
                    Removed Columns
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {comparison.removed_columns.length
                      ? comparison.removed_columns.join(", ")
                      : "No removed columns"}
                  </p>
                </div>

                <div className="rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 p-5">
                  <p className="font-black text-blue-700 dark:text-blue-300">
                    Common Columns
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-h-24 overflow-y-auto">
                    {comparison.common_columns.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Numeric Column Changes
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Sum, mean and difference comparison for numeric fields.
                </p>
              </div>

              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
                <BarChart3 size={22} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="text-left p-4">Column</th>
                    <th className="text-left p-4">V1 Sum</th>
                    <th className="text-left p-4">V2 Sum</th>
                    <th className="text-left p-4">Difference</th>
                    <th className="text-left p-4">V1 Mean</th>
                    <th className="text-left p-4">V2 Mean</th>
                    <th className="text-left p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {numericChanges.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-6 text-slate-500 dark:text-slate-400"
                      >
                        No numeric changes available.
                      </td>
                    </tr>
                  ) : (
                    numericChanges.map((item) => {
                      const isPositive = Number(item.difference) >= 0;

                      return (
                        <tr
                          key={item.column}
                          className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                        >
                          <td className="p-4 font-black text-slate-900 dark:text-white">
                            {item.column}
                          </td>

                          <td className="p-4 text-slate-700 dark:text-slate-200">
                            {item.version_1_sum}
                          </td>

                          <td className="p-4 text-slate-700 dark:text-slate-200">
                            {item.version_2_sum}
                          </td>

                          <td className="p-4">
                            <span
                              className={`badge ${
                                isPositive
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                              }`}
                            >
                              {item.difference}
                            </span>
                          </td>

                          <td className="p-4 text-slate-700 dark:text-slate-200">
                            {item.version_1_mean}
                          </td>

                          <td className="p-4 text-slate-700 dark:text-slate-200">
                            {item.version_2_mean}
                          </td>

                          <td className="p-4">
                            {isPositive ? (
                              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-300 font-bold">
                                <TrendingUp size={16} />
                                Increased
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-300 font-bold">
                                <TrendingDown size={16} />
                                Decreased
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
              <CheckCircle size={32} />
              <h3 className="font-black text-xl mt-4">Schema Tracking</h3>
              <p className="text-sm text-white/75 mt-2">
                Track added, removed and common columns between dataset versions.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
              <Activity size={32} />
              <h3 className="font-black text-xl mt-4">Numeric Analysis</h3>
              <p className="text-sm text-white/75 mt-2">
                Compare numeric columns using sum, mean and difference metrics.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
              <Database size={32} />
              <h3 className="font-black text-xl mt-4">Version Intelligence</h3>
              <p className="text-sm text-white/75 mt-2">
                Validate dataset changes before using them in forecasting models.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatasetComparison;