import { useEffect, useState } from "react";
import API from "../api/api";
import {
  FileText,
  Calendar,
  Download,
  Clock,
  Sparkles,
  BriefcaseBusiness,
  BarChart3,
  Rocket,
  PlusCircle,
  Layers,
  TrendingUp,
  PieChart,
} from "lucide-react";

import StatCard from "../components/StatCard";

const ExecutiveReports = () => {
  const [reports, setReports] = useState([]);
  const [reportType, setReportType] = useState("executive_summary");

  const fetchReports = async () => {
    try {
      const res = await API.get("/executive/reports");
      setReports(res.data);
    } catch (error) {
      console.error("Failed to fetch executive reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const generateExecutiveReport = async () => {
    try {
      await API.post(`/executive/reports?report_type=${reportType}`);
      alert("Executive report generated successfully");
      fetchReports();
    } catch (error) {
      alert("Failed to generate executive report");
    }
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-indigo-800 to-violet-700 p-8 text-white shadow-2xl shadow-indigo-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <BriefcaseBusiness size={16} />
              Executive Reporting Suite
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Management-Level Forecast Reports
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Generate executive summaries, monthly business forecast reports,
              revenue and demand outlooks, and management analytics summaries.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={generateExecutiveReport}
                className="bg-white text-indigo-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
              >
                Generate Report
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                Schedule Report
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Executive Reports</p>
                  <h2 className="text-5xl font-black mt-2">{reports.length}</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Summary</p>
                  <p className="font-black mt-1">Ready</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Monthly</p>
                  <p className="font-black mt-1">Active</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Outlook</p>
                  <p className="font-black mt-1">Live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Executive Summary"
          value="Ready"
          subtitle="Management-level summary"
          icon={FileText}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Monthly Reports"
          value="Active"
          subtitle="Monthly demand outlook"
          icon={Calendar}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Scheduling"
          value="Enabled"
          subtitle="Recurring configuration"
          icon={Clock}
          gradient="from-orange-500 to-rose-500"
        />

        <StatCard
          title="Reports"
          value={reports.length}
          subtitle="Generated executive reports"
          icon={Download}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <FileText size={32} />
          <h3 className="font-black text-xl mt-4">Executive Summary</h3>
          <p className="text-sm text-white/75 mt-2">
            High-level management summary for business decisions.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <TrendingUp size={32} />
          <h3 className="font-black text-xl mt-4">Revenue Outlook</h3>
          <p className="text-sm text-white/75 mt-2">
            Revenue and demand outlook reports for leadership review.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <PieChart size={32} />
          <h3 className="font-black text-xl mt-4">Business Analytics</h3>
          <p className="text-sm text-white/75 mt-2">
            Management-level analytics summaries and insights.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
          <Clock size={32} />
          <h3 className="font-black text-xl mt-4">Report Scheduling</h3>
          <p className="text-sm text-white/75 mt-2">
            Configure recurring report schedules for executives.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center">
            <PlusCircle size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Generate Executive Report
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose the report type and generate a management-ready forecast summary.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="input"
          >
            <option value="executive_summary">Executive Summary</option>
            <option value="monthly_business_forecast">
              Monthly Business Forecast
            </option>
            <option value="revenue_demand_outlook">
              Revenue and Demand Outlook
            </option>
            <option value="management_analytics_summary">
              Management Analytics Summary
            </option>
          </select>

          <button
            onClick={generateExecutiveReport}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Generate Report
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Executive Report Library
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Generated management-level analytics summaries.
            </p>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center">
            <Layers size={22} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="text-left p-4">Report</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Summary</th>
                <th className="text-left p-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-slate-500 dark:text-slate-400"
                  >
                    No executive reports generated yet.
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
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center">
                          <FileText size={18} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {report.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            Executive Report #{report.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                        {report.report_type}
                      </span>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xl">
                      {report.summary}
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {report.created_at
                        ? new Date(report.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 flex items-center justify-center">
            <BarChart3 size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              Executive Reporting Module Complete
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports executive summaries, monthly forecasts, revenue/demand outlooks,
              management analytics summaries, and scheduling configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveReports;