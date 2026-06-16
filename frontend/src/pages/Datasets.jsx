import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Upload,
  Archive,
  GitCompare,
  History,
  Database,
  FileSpreadsheet,
  Sparkles,
  CloudUpload,
  Layers,
  Trash2,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import StatCard from "../components/StatCard";

const Datasets = () => {
  const [datasets, setDatasets] = useState([]);
  const [file, setFile] = useState(null);
  const [organizationId, setOrganizationId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDatasets = async () => {
    try {
      const url = organizationId
        ? `/datasets/?organization_id=${organizationId}`
        : "/datasets/";

      const res = await API.get(url);
      setDatasets(res.data);
    } catch (error) {
      console.error("Failed to fetch datasets", error);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a dataset file");
      return;
    }

    if (!organizationId) {
      alert("Please enter Organization ID");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("organization_id", organizationId);

    if (projectId) {
      formData.append("project_id", projectId);
    }

    try {
      setLoading(true);

      await API.post("/datasets/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      setProjectId("");
      fetchDatasets();
      alert("Dataset uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Dataset upload failed");
    } finally {
      setLoading(false);
    }
  };

  const archiveDataset = async (id) => {
    try {
      await API.put(`/datasets/${id}/archive`);
      fetchDatasets();
      alert("Dataset archived successfully");
    } catch (error) {
      alert("Archive failed");
    }
  };

  const totalRows = datasets.reduce(
    (sum, dataset) => sum + Number(dataset.rows_count || 0),
    0
  );

  const totalColumns = datasets.reduce(
    (sum, dataset) => sum + Number(dataset.columns_count || 0),
    0
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-700 p-8 text-white shadow-2xl shadow-cyan-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-emerald-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Database size={16} />
              Data Management Center
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Upload, Version & Compare Datasets
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Manage CSV and Excel datasets with organization-based isolation,
              upload history, versioning, and forecasting readiness.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Uploaded Datasets</p>
                  <h2 className="text-5xl font-black mt-2">
                    {datasets.length}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <CloudUpload size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Rows</p>
                  <p className="font-black mt-1">{totalRows}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Columns</p>
                  <p className="font-black mt-1">{totalColumns}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Versioning</p>
                  <p className="font-black mt-1">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpload} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
            <Upload size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Upload Dataset
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Upload CSV or Excel files and link them to an organization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <label className="md:col-span-2 cursor-pointer rounded-3xl border-2 border-dashed border-cyan-300 dark:border-cyan-800 bg-white/70 dark:bg-slate-800/70 p-5 flex items-center gap-4 hover:bg-cyan-50 dark:hover:bg-slate-800 transition">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
              <FileSpreadsheet size={26} />
            </div>

            <div>
              <p className="font-black text-slate-900 dark:text-white">
                {file ? file.name : "Choose CSV / Excel file"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Supported formats: .csv, .xlsx
              </p>
            </div>

            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <input
            type="number"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            placeholder="Organization ID"
            className="input"
            required
          />

          <input
            type="number"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Project ID optional"
            className="input"
          />

          <button
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Upload size={18} />
            {loading ? "Uploading..." : "Upload Dataset"}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Datasets"
          value={datasets.length}
          subtitle="Uploaded active files"
          icon={Database}
          gradient="from-cyan-500 to-blue-600"
        />

        <StatCard
          title="Total Rows"
          value={totalRows}
          subtitle="Rows available for ML"
          icon={BarChart3}
          gradient="from-emerald-500 to-teal-500"
        />

        <StatCard
          title="Columns"
          value={totalColumns}
          subtitle="Feature columns"
          icon={Layers}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Versioning"
          value="Enabled"
          subtitle="Track dataset updates"
          icon={History}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <History size={32} />
          <h3 className="font-black text-xl mt-4">Versioning</h3>
          <p className="text-sm text-white/75 mt-2">
            Maintain dataset versions and complete upload history.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white shadow-xl">
          <GitCompare size={32} />
          <h3 className="font-black text-xl mt-4">Comparison</h3>
          <p className="text-sm text-white/75 mt-2">
            Compare changes between different dataset versions.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <Archive size={32} />
          <h3 className="font-black text-xl mt-4">Archive</h3>
          <p className="text-sm text-white/75 mt-2">
            Archive old datasets without permanently deleting records.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-xl">
          <ShieldCheck size={32} />
          <h3 className="font-black text-xl mt-4">Upload History</h3>
          <p className="text-sm text-white/75 mt-2">
            Track dataset creation, modifications, and ownership.
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Dataset Library
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Uploaded datasets available for forecasting and analysis.
            </p>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
            <Sparkles size={22} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="text-left p-4">Dataset</th>
                <th className="text-left p-4">Rows</th>
                <th className="text-left p-4">Columns</th>
                <th className="text-left p-4">Version</th>
                <th className="text-left p-4">Archived</th>
                <th className="text-left p-4">Created</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {datasets.length === 0 ? (
                <tr>
                  <td
                    className="p-6 text-slate-500 dark:text-slate-400"
                    colSpan="7"
                  >
                    No datasets uploaded yet.
                  </td>
                </tr>
              ) : (
                datasets.map((dataset) => (
                  <tr
                    key={dataset.id}
                    className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
                          <FileSpreadsheet size={18} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {dataset.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            Dataset #{dataset.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">
                      {dataset.rows_count}
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">
                      {dataset.columns_count}
                    </td>

                    <td className="p-4">
                      <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                        v{dataset.current_version}
                      </span>
                    </td>

                    <td className="p-4">
                      {dataset.is_archived ? (
                        <span className="badge bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                          Archived
                        </span>
                      ) : (
                        <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          Active
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {dataset.created_at
                        ? new Date(dataset.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => archiveDataset(dataset.id)}
                        className="text-rose-600 dark:text-rose-300 font-bold flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Archive
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Datasets;