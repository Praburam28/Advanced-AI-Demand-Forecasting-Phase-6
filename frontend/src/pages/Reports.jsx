import { useEffect, useState } from "react";
import API from "../api/api";
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Sparkles,
  FileBarChart,
  FileSpreadsheet,
  Rocket,
  PlusCircle,
  Layers,
  Share2,
} from "lucide-react";

import StatCard from "../components/StatCard";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    title: "",
    report_type: "forecast",
    forecast_id: "",
    project_id: "",
  });

  const fetchData = async () => {
    try {
      const reportRes = await API.get("/reports/");
      const forecastRes = await API.get("/forecasts/");
      const projectRes = await API.get("/workspaces/");

      setReports(reportRes.data);
      setForecasts(forecastRes.data);
      setProjects(projectRes.data);
    } catch (error) {
      console.error("Failed to fetch report data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createReport = async (e) => {
    e.preventDefault();

    if (!form.title) {
      alert("Report title is required");
      return;
    }

    try {
      await API.post("/reports/", {
        title: form.title,
        report_type: form.report_type,
        forecast_id: form.forecast_id ? Number(form.forecast_id) : null,
        project_id: form.project_id ? Number(form.project_id) : null,
      });

      alert("Report generated successfully");

      setForm({
        title: "",
        report_type: "forecast",
        forecast_id: "",
        project_id: "",
      });

      fetchData();
    } catch (error) {
      alert("Report generation failed");
    }
  };

  const deleteReport = async (id) => {
    try {
      await API.delete(`/reports/${id}`);
      fetchData();
      alert("Report deleted successfully");
    } catch (error) {
      alert("Report delete failed");
    }
  };

  const downloadReport = async (id, type) => {
    try {
      const res = await API.get(`/reports/${id}/download/${type}`, {
        responseType: "blob",
      });

      const fileType =
        type === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const extension = type === "pdf" ? "pdf" : "xlsx";

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: fileType })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report_${id}.${extension}`);

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(
        `${type.toUpperCase()} download failed. Make sure this report is linked to a forecast.`
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-rose-600 via-orange-500 to-violet-700 p-8 text-white shadow-2xl shadow-orange-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-yellow-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <FileText size={16} />
              Forecast Reporting Center
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Generate, Export & Manage Reports
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Create forecast, dataset, accuracy, and executive reports with
              professional PDF and Excel download support.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-orange-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Generate Report
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                Export Center
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Generated Reports</p>
                  <h2 className="text-5xl font-black mt-2">
                    {reports.length}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">PDF</p>
                  <p className="font-black mt-1">Ready</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Excel</p>
                  <p className="font-black mt-1">Ready</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Sharing</p>
                  <p className="font-black mt-1">Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={createReport} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center">
            <PlusCircle size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Generate New Report
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Link reports with forecasts and projects for PDF/Excel export.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Report title"
            className="input"
          />

          <select
            value={form.report_type}
            onChange={(e) =>
              setForm({ ...form, report_type: e.target.value })
            }
            className="input"
          >
            <option value="forecast">Forecast Report</option>
            <option value="dataset">Dataset Report</option>
            <option value="accuracy">Accuracy Report</option>
            <option value="executive">Executive Report</option>
          </select>

          <select
            value={form.forecast_id}
            onChange={(e) =>
              setForm({ ...form, forecast_id: e.target.value })
            }
            className="input"
          >
            <option value="">No Forecast</option>
            {forecasts.map((forecast) => (
              <option key={forecast.id} value={forecast.id}>
                {forecast.model_name} - #{forecast.id}
              </option>
            ))}
          </select>

          <select
            value={form.project_id}
            onChange={(e) =>
              setForm({ ...form, project_id: e.target.value })
            }
            className="input"
          >
            <option value="">No Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <button className="btn-primary flex items-center justify-center gap-2">
            <Sparkles size={18} />
            Generate
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Reports"
          value={reports.length}
          subtitle="Generated reports"
          icon={FileText}
          gradient="from-orange-500 to-rose-500"
        />

        <StatCard
          title="View Reports"
          value="Ready"
          subtitle="Review analytics reports"
          icon={Eye}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Export Center"
          value="PDF / Excel"
          subtitle="Download reports"
          icon={Download}
          gradient="from-emerald-500 to-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 p-6 text-white shadow-xl">
          <FileBarChart size={32} />
          <h3 className="font-black text-xl mt-4">Forecast Reports</h3>
          <p className="text-sm text-white/75 mt-2">
            Generate detailed demand, revenue, profit, cost and accuracy reports.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <FileSpreadsheet size={32} />
          <h3 className="font-black text-xl mt-4">Excel Export</h3>
          <p className="text-sm text-white/75 mt-2">
            Download structured report summaries in spreadsheet format.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <Share2 size={32} />
          <h3 className="font-black text-xl mt-4">Report Sharing</h3>
          <p className="text-sm text-white/75 mt-2">
            Reports can be linked with projects and shared with team members.
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Report Library
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              View, export and manage generated forecasting reports.
            </p>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center">
            <Layers size={22} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="text-left p-4">Report</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Created</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-slate-500 dark:text-slate-400"
                  >
                    No reports generated yet.
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center">
                          <FileText size={18} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {report.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            Report #{report.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                        {report.report_type}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        {report.status}
                      </span>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {report.created_at
                        ? new Date(report.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => downloadReport(report.id, "pdf")}
                          className="text-blue-600 dark:text-blue-300 font-bold flex items-center gap-1"
                        >
                          <Download size={16} />
                          PDF
                        </button>

                        <button
                          onClick={() => downloadReport(report.id, "excel")}
                          className="text-emerald-600 dark:text-emerald-300 font-bold flex items-center gap-1"
                        >
                          <Download size={16} />
                          Excel
                        </button>

                        <button
                          onClick={() => deleteReport(report.id)}
                          className="text-rose-600 dark:text-rose-300 font-bold flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
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

export default Reports;