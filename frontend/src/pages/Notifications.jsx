import { useEffect, useState } from "react";
import API from "../api/api";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Rocket,
  CheckCheck,
  Clock,
  Activity,
  Mail,
} from "lucide-react";

import StatCard from "../components/StatCard";

const getIcon = (type) => {
  if (type === "success") return CheckCircle;
  if (type === "warning") return AlertTriangle;
  return Info;
};

const getGradient = (type) => {
  if (type === "success") return "from-emerald-500 to-cyan-500";
  if (type === "warning") return "from-orange-500 to-rose-500";
  return "from-violet-600 to-fuchsia-600";
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications/");
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (error) {
      alert("Failed to update notification");
    }
  };

  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const readCount = notifications.filter((item) => item.is_read).length;
  const warningCount = notifications.filter(
    (item) => item.notification_type === "warning"
  ).length;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-cyan-600 via-blue-700 to-violet-700 p-8 text-white shadow-2xl shadow-blue-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <Bell size={16} />
              Notification Center
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              System Alerts & Forecast Updates
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Track forecast completion, dataset uploads, report generation,
              system alerts, and business workflow updates in one place.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-blue-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                View Alerts
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                Notification Settings
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Unread Notifications</p>
                  <h2 className="text-5xl font-black mt-2">{unreadCount}</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Total</p>
                  <p className="font-black mt-1">{notifications.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Read</p>
                  <p className="font-black mt-1">{readCount}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Warnings</p>
                  <p className="font-black mt-1">{warningCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Total Alerts"
          value={notifications.length}
          subtitle="All system notifications"
          icon={Bell}
          gradient="from-blue-500 to-indigo-600"
        />

        <StatCard
          title="Unread"
          value={unreadCount}
          subtitle="Need attention"
          icon={Mail}
          gradient="from-orange-500 to-rose-500"
        />

        <StatCard
          title="Read"
          value={readCount}
          subtitle="Completed notifications"
          icon={CheckCheck}
          gradient="from-emerald-500 to-cyan-500"
        />

        <StatCard
          title="Warnings"
          value={warningCount}
          subtitle="Important alerts"
          icon={AlertTriangle}
          gradient="from-violet-600 to-fuchsia-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <CheckCircle size={32} />
          <h3 className="font-black text-xl mt-4">Success Alerts</h3>
          <p className="text-sm text-white/75 mt-2">
            Forecast completion, reports generated, and successful uploads.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <AlertTriangle size={32} />
          <h3 className="font-black text-xl mt-4">Warning Alerts</h3>
          <p className="text-sm text-white/75 mt-2">
            Dataset upload failures, forecast issues, and system warnings.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <Info size={32} />
          <h3 className="font-black text-xl mt-4">Info Updates</h3>
          <p className="text-sm text-white/75 mt-2">
            General updates related to projects, collaboration and reports.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center">
            <Sparkles size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Recent Notifications
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Latest alerts from forecasting, datasets, reports and system activity.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-5">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No notifications available.
              </p>
            </div>
          ) : (
            notifications.map((item) => {
              const Icon = getIcon(item.notification_type);
              const gradient = getGradient(item.notification_type);

              return (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-3xl border p-5 transition hover:scale-[1.01] ${
                    item.is_read
                      ? "bg-white/70 dark:bg-slate-800/70 border-white dark:border-slate-700"
                      : "bg-white/90 dark:bg-slate-900/90 border-cyan-200 dark:border-cyan-900 shadow-lg shadow-cyan-500/10"
                  }`}
                >
                  {!item.is_read && (
                    <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-violet-600" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg`}
                    >
                      <Icon size={25} />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-black text-slate-900 dark:text-white">
                          {item.title}
                        </h4>

                        <span
                          className={`badge bg-gradient-to-r ${gradient} text-white`}
                        >
                          {item.notification_type || "info"}
                        </span>

                        {!item.is_read && (
                          <span className="badge bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-6">
                        {item.message}
                      </p>

                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400 dark:text-slate-500">
                        <Clock size={14} />
                        <span>
                          {item.created_at
                            ? new Date(item.created_at).toLocaleString()
                            : "Recently"}
                        </span>
                      </div>
                    </div>

                    {item.is_read ? (
                      <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Read
                      </span>
                    ) : (
                      <button
                        onClick={() => markRead(item.id)}
                        className="btn-secondary whitespace-nowrap"
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Activity size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              Notification Module Complete
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports forecast completion alerts, dataset upload alerts, report generation
              messages, read status tracking, and professional notification workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;