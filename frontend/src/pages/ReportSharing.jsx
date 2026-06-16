import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Share2,
  Users,
  FileText,
  ShieldCheck,
  Trash2,
  Inbox,
  Sparkles,
  Rocket,
  UserPlus,
  Eye,
  Pencil,
  LockKeyhole,
  Layers,
  Send,
} from "lucide-react";

import StatCard from "../components/StatCard";

const ReportSharing = () => {
  const [reports, setReports] = useState([]);
  const [shares, setShares] = useState([]);
  const [sharedWithMe, setSharedWithMe] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState("");

  const [form, setForm] = useState({
    report_id: "",
    shared_with: "",
    access_level: "viewer",
  });

  const fetchReports = async () => {
    try {
      const res = await API.get("/reports/");
      setReports(res.data);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    }
  };

  const fetchSharedWithMe = async () => {
    try {
      const res = await API.get("/report-sharing/shared-with-me");
      setSharedWithMe(res.data);
    } catch (error) {
      console.error("Failed to fetch shared reports", error);
    }
  };

  const fetchReportShares = async (reportId) => {
    if (!reportId) return;

    try {
      const res = await API.get(`/report-sharing/report/${reportId}`);
      setShares(res.data);
      setSelectedReportId(reportId);
    } catch (error) {
      alert("Failed to fetch report shares");
    }
  };

  useEffect(() => {
    fetchReports();
    fetchSharedWithMe();
  }, []);

  const shareReport = async (e) => {
    e.preventDefault();

    if (!form.report_id || !form.shared_with) {
      alert("Report and user ID are required");
      return;
    }

    try {
      await API.post("/report-sharing/", {
        report_id: Number(form.report_id),
        shared_with: Number(form.shared_with),
        access_level: form.access_level,
      });

      alert("Report shared successfully");

      setForm({
        report_id: form.report_id,
        shared_with: "",
        access_level: "viewer",
      });

      fetchReportShares(form.report_id);
      fetchSharedWithMe();
    } catch (error) {
      alert("Report sharing failed");
    }
  };

  const revokeShare = async (shareId) => {
    try {
      await API.delete(`/report-sharing/${shareId}`);
      fetchReportShares(selectedReportId);
      alert("Share access revoked");
    } catch (error) {
      alert("Failed to revoke share");
    }
  };

  const accessStyle = {
    viewer:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    editor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  };

  const selectedReport = reports.find(
    (report) => String(report.id) === String(selectedReportId)
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-600 p-8 text-white shadow-2xl shadow-violet-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-pink-300/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Share2 size={16} />
              Report Sharing Center
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Share Forecast Reports Securely
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Share forecasting and executive reports with team members, manage
              viewer/editor access, revoke shares, and track reports shared with you.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Share Report
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View Shared Reports
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Shares</p>
                  <h2 className="text-5xl font-black mt-2">{shares.length}</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Reports</p>
                  <p className="font-black mt-1">{reports.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">With Me</p>
                  <p className="font-black mt-1">{sharedWithMe.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Access</p>
                  <p className="font-black mt-1">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Reports"
          value={reports.length}
          subtitle="Available to share"
          icon={FileText}
          gradient="from-blue-500 to-indigo-600"
        />

        <StatCard
          title="Active Shares"
          value={shares.length}
          subtitle="Selected report access"
          icon={Share2}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Shared With Me"
          value={sharedWithMe.length}
          subtitle="Incoming reports"
          icon={Inbox}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Access Control"
          value="Enabled"
          subtitle="Viewer/editor roles"
          icon={ShieldCheck}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
          <Eye size={32} />
          <h3 className="font-black text-xl mt-4">Viewer Access</h3>
          <p className="text-sm text-white/75 mt-2">
            Allow users to view reports without editing permissions.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <Pencil size={32} />
          <h3 className="font-black text-xl mt-4">Editor Access</h3>
          <p className="text-sm text-white/75 mt-2">
            Grant advanced access for report collaboration workflows.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <LockKeyhole size={32} />
          <h3 className="font-black text-xl mt-4">Secure Revoke</h3>
          <p className="text-sm text-white/75 mt-2">
            Remove access anytime using the active share management table.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <form onSubmit={shareReport} className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center">
              <UserPlus size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Share Report
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Assign report access to another platform user.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Report
              </label>

              <select
                value={form.report_id}
                onChange={(e) => {
                  setForm({ ...form, report_id: e.target.value });
                  fetchReportShares(e.target.value);
                }}
                className="input mt-1"
              >
                <option value="">Select report</option>
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    #{report.id} - {report.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Share With User ID
              </label>

              <input
                type="number"
                value={form.shared_with}
                onChange={(e) =>
                  setForm({ ...form, shared_with: e.target.value })
                }
                placeholder="Enter user ID"
                className="input mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Access Level
              </label>

              <select
                value={form.access_level}
                onChange={(e) =>
                  setForm({ ...form, access_level: e.target.value })
                }
                className="input mt-1"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
            </div>

            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Send size={18} />
              Share Report
            </button>
          </div>
        </form>

        <div className="xl:col-span-2 card overflow-hidden">
          <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Active Report Shares
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedReport
                  ? `Viewing shares for ${selectedReport.title}`
                  : "Select a report to view and revoke sharing permissions."}
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <Layers size={22} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left p-4">Share</th>
                  <th className="text-left p-4">Report</th>
                  <th className="text-left p-4">Shared With</th>
                  <th className="text-left p-4">Access</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {shares.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-slate-500 dark:text-slate-400"
                    >
                      No active shares for selected report.
                    </td>
                  </tr>
                ) : (
                  shares.map((share) => (
                    <tr
                      key={share.id}
                      className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center">
                            <Share2 size={18} />
                          </div>

                          <div>
                            <p className="font-black text-slate-900 dark:text-white">
                              Share #{share.id}
                            </p>
                            <p className="text-xs text-slate-400">
                              Access record
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-700 dark:text-slate-200">
                        Report #{share.report_id}
                      </td>

                      <td className="p-4 text-slate-700 dark:text-slate-200">
                        User #{share.shared_with}
                      </td>

                      <td className="p-4">
                        <span
                          className={`badge ${
                            accessStyle[share.access_level] ||
                            "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          {share.access_level}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {share.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => revokeShare(share.id)}
                          className="text-rose-600 dark:text-rose-300 font-bold flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Revoke
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

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Reports Shared With Me
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Reports where another user granted you access.
            </p>
          </div>

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white flex items-center justify-center">
            <Inbox size={22} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="text-left p-4">Share</th>
                <th className="text-left p-4">Report</th>
                <th className="text-left p-4">Shared By</th>
                <th className="text-left p-4">Access</th>
                <th className="text-left p-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {sharedWithMe.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-slate-500 dark:text-slate-400"
                  >
                    No reports shared with you yet.
                  </td>
                </tr>
              ) : (
                sharedWithMe.map((share) => (
                  <tr
                    key={share.id}
                    className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="p-4 font-black text-slate-900 dark:text-white">
                      Share #{share.id}
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">
                      Report #{share.report_id}
                    </td>

                    <td className="p-4 text-slate-700 dark:text-slate-200">
                      User #{share.shared_by}
                    </td>

                    <td className="p-4">
                      <span
                        className={`badge ${
                          accessStyle[share.access_level] ||
                          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {share.access_level}
                      </span>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {share.created_at
                        ? new Date(share.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-blue-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Sparkles size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              Report Sharing Module Ready
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports report sharing, viewer/editor access levels, incoming shared reports,
              and secure revocation workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSharing;