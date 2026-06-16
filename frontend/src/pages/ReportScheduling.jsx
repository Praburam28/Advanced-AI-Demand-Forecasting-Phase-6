import { useEffect, useState } from "react";
import API from "../api/api";
import {
  CalendarClock,
  Mail,
  FileText,
  Repeat,
  Power,
  Trash2,
  Sparkles,
  Rocket,
  Clock,
  FileSpreadsheet,
  PlusCircle,
  Layers,
  Send,
  CheckCircle,
  PauseCircle,
} from "lucide-react";

import StatCard from "../components/StatCard";

const ReportScheduling = () => {
  const [projects, setProjects] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [form, setForm] = useState({
    report_type: "executive_summary",
    schedule_frequency: "monthly",
    delivery_format: "pdf",
    recipient_email: "",
    project_id: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get("/workspaces/");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await API.get("/report-schedules/");
      setSchedules(res.data);
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSchedules();
  }, []);

  const createSchedule = async (e) => {
    e.preventDefault();

    try {
      await API.post("/report-schedules/", {
        report_type: form.report_type,
        schedule_frequency: form.schedule_frequency,
        delivery_format: form.delivery_format,
        recipient_email: form.recipient_email || null,
        project_id: form.project_id ? Number(form.project_id) : null,
      });

      alert("Report schedule created successfully");

      setForm({
        report_type: "executive_summary",
        schedule_frequency: "monthly",
        delivery_format: "pdf",
        recipient_email: "",
        project_id: "",
      });

      fetchSchedules();
    } catch (error) {
      alert("Failed to create report schedule");
    }
  };

  const toggleSchedule = async (id) => {
    try {
      await API.put(`/report-schedules/${id}/toggle`);
      fetchSchedules();
    } catch (error) {
      alert("Failed to update schedule");
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await API.delete(`/report-schedules/${id}`);
      fetchSchedules();
      alert("Schedule deleted successfully");
    } catch (error) {
      alert("Failed to delete schedule");
    }
  };

  const activeCount = schedules.filter((item) => item.is_active).length;
  const pausedCount = schedules.length - activeCount;

  const statusStyle = (isActive) =>
    isActive
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-rose-600 to-violet-700 p-8 text-white shadow-2xl shadow-orange-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-yellow-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <CalendarClock size={16} />
              Report Scheduling Center
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Automate Executive Report Delivery
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Configure daily, weekly, or monthly executive reports with PDF or
              Excel delivery, project-level filtering, and email recipient settings.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-orange-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Create Schedule
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View Schedules
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Schedules</p>
                  <h2 className="text-5xl font-black mt-2">{activeCount}</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Total</p>
                  <p className="font-black mt-1">{schedules.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Paused</p>
                  <p className="font-black mt-1">{pausedCount}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Projects</p>
                  <p className="font-black mt-1">{projects.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Recurring Reports"
          value={schedules.length}
          subtitle="Configured schedules"
          icon={Repeat}
          gradient="from-blue-500 to-indigo-600"
        />

        <StatCard
          title="Email Delivery"
          value="Ready"
          subtitle="Recipient email support"
          icon={Mail}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="PDF / Excel"
          value="Enabled"
          subtitle="Export format options"
          icon={FileText}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Active Schedules"
          value={activeCount}
          subtitle="Currently running"
          icon={CalendarClock}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-xl">
          <Repeat size={32} />
          <h3 className="font-black text-xl mt-4">Daily / Weekly / Monthly</h3>
          <p className="text-sm text-white/75 mt-2">
            Configure recurring report frequency for leadership delivery.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <Send size={32} />
          <h3 className="font-black text-xl mt-4">Email Delivery</h3>
          <p className="text-sm text-white/75 mt-2">
            Store recipient email for automated scheduled report delivery.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <FileSpreadsheet size={32} />
          <h3 className="font-black text-xl mt-4">PDF / Excel Export</h3>
          <p className="text-sm text-white/75 mt-2">
            Choose export format for management-ready reporting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <form onSubmit={createSchedule} className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center">
              <PlusCircle size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Create Schedule
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Configure report type, frequency, format and recipient email.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Report Type
              </label>

              <select
                value={form.report_type}
                onChange={(e) =>
                  setForm({ ...form, report_type: e.target.value })
                }
                className="input mt-1"
              >
                <option value="executive_summary">Executive Summary</option>
                <option value="monthly_business_forecast">
                  Monthly Business Forecast
                </option>
                <option value="revenue_demand_outlook">
                  Revenue & Demand Outlook
                </option>
                <option value="management_analytics_summary">
                  Management Analytics Summary
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Frequency
              </label>

              <select
                value={form.schedule_frequency}
                onChange={(e) =>
                  setForm({ ...form, schedule_frequency: e.target.value })
                }
                className="input mt-1"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Format
              </label>

              <select
                value={form.delivery_format}
                onChange={(e) =>
                  setForm({ ...form, delivery_format: e.target.value })
                }
                className="input mt-1"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Recipient Email
              </label>

              <input
                type="email"
                value={form.recipient_email}
                onChange={(e) =>
                  setForm({ ...form, recipient_email: e.target.value })
                }
                placeholder="manager@example.com"
                className="input mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Project
              </label>

              <select
                value={form.project_id}
                onChange={(e) =>
                  setForm({ ...form, project_id: e.target.value })
                }
                className="input mt-1"
              >
                <option value="">No project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Create Schedule
            </button>
          </div>
        </form>

        <div className="xl:col-span-2 card overflow-hidden">
          <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Scheduled Reports
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage recurring report schedules and delivery configuration.
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
                  <th className="text-left p-4">Schedule</th>
                  <th className="text-left p-4">Report Type</th>
                  <th className="text-left p-4">Frequency</th>
                  <th className="text-left p-4">Format</th>
                  <th className="text-left p-4">Recipient</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {schedules.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-6 text-slate-500 dark:text-slate-400"
                    >
                      No schedules configured yet.
                    </td>
                  </tr>
                ) : (
                  schedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 text-white flex items-center justify-center">
                            <Clock size={18} />
                          </div>

                          <div>
                            <p className="font-black text-slate-900 dark:text-white">
                              Schedule #{schedule.id}
                            </p>
                            <p className="text-xs text-slate-400">
                              Recurring report
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-700 dark:text-slate-200">
                        {schedule.report_type}
                      </td>

                      <td className="p-4">
                        <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                          {schedule.schedule_frequency}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {schedule.delivery_format}
                        </span>
                      </td>

                      <td className="p-4 text-slate-700 dark:text-slate-200">
                        {schedule.recipient_email || "Not set"}
                      </td>

                      <td className="p-4">
                        <span className={`badge ${statusStyle(schedule.is_active)}`}>
                          {schedule.is_active ? "Active" : "Paused"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => toggleSchedule(schedule.id)}
                            className="text-blue-600 dark:text-blue-300 font-bold flex items-center gap-1"
                          >
                            {schedule.is_active ? (
                              <PauseCircle size={16} />
                            ) : (
                              <Power size={16} />
                            )}
                            Toggle
                          </button>

                          <button
                            onClick={() => deleteSchedule(schedule.id)}
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

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-orange-950 to-violet-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-400 to-fuchsia-500 flex items-center justify-center">
            <CheckCircle size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              Report Scheduling Module Ready
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports daily, weekly and monthly schedules, PDF/Excel delivery format,
              email recipient storage, active/paused toggle and schedule deletion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportScheduling;