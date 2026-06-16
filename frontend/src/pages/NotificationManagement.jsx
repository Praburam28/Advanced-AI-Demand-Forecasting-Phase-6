import { useEffect, useState } from "react";
import {
  Bell,
  Plus,
  Mail,
  Monitor,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import {
  getNotificationPreferences,
  createNotificationPreference,
  updateNotificationPreference,
} from "../api/notificationPreferenceApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function NotificationManagement() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;

  const [preferences, setPreferences] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    role: "analyst",
    email_enabled: false,
    in_app_enabled: true,
    forecast_alerts: true,
    approval_alerts: true,
    report_alerts: true,
    workflow_alerts: true,
    kpi_alerts: true,
    data_quality_alerts: true,
  });

  const fetchPreferences = async () => {
    if (!organizationId) return;

    const res = await getNotificationPreferences(organizationId);
    setPreferences(res.data);
  };

  useEffect(() => {
    fetchPreferences();
  }, [organizationId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!organizationId) {
      alert("Please create or select an organization first");
      return;
    }

    await createNotificationPreference({
      organization_id: Number(organizationId),
      user_id: Number(form.user_id),
      role: form.role || "analyst",
      forecast_alerts: Boolean(form.forecast_alerts),
      approval_alerts: Boolean(form.approval_alerts),
      report_alerts: Boolean(form.report_alerts),
      workflow_alerts: Boolean(form.workflow_alerts),
      kpi_alerts: Boolean(form.kpi_alerts),
      data_quality_alerts: Boolean(form.data_quality_alerts),
      email_enabled: Boolean(form.email_enabled),
      in_app_enabled: Boolean(form.in_app_enabled),
    });

    setForm({
      user_id: "",
      role: "analyst",
      email_enabled: false,
      in_app_enabled: true,
      forecast_alerts: true,
      approval_alerts: true,
      report_alerts: true,
      workflow_alerts: true,
      kpi_alerts: true,
      data_quality_alerts: true,
    });

    fetchPreferences();
  };

  const toggleEmail = async (pref) => {
    await updateNotificationPreference(pref.id, {
      email_enabled: !pref.email_enabled,
    });

    fetchPreferences();
  };

  const toggleInApp = async (pref) => {
    await updateNotificationPreference(pref.id, {
      in_app_enabled: !pref.in_app_enabled,
    });

    fetchPreferences();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Bell size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Notification Management</h1>
              <p className="text-white/60">
                Configure role-based alerts, notification preferences and organization-wide notification settings.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreate}
          className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create Preference</h2>
              <p className="text-sm text-white/50">User notification settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="user_id"
              value={form.user_id}
              onChange={handleChange}
              placeholder="User ID"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none placeholder:text-white/40"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="analyst">Analyst</option>
              <option value="viewer">Viewer</option>
            </select>

            {[
              ["forecast_alerts", "Forecast Alerts"],
              ["approval_alerts", "Approval Alerts"],
              ["report_alerts", "Report Alerts"],
              ["workflow_alerts", "Workflow Alerts"],
              ["kpi_alerts", "KPI Alerts"],
              ["data_quality_alerts", "Data Quality Alerts"],
              ["email_enabled", "Email Enabled"],
              ["in_app_enabled", "In-App Enabled"],
            ].map(([name, label]) => (
              <label
                key={name}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <span className="font-semibold">{label}</span>
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name]}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </label>
            ))}

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 py-4 font-bold shadow-xl">
              <Plus size={18} />
              Save Preference
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <Settings2 className="text-cyan-300" />
            <div>
              <h2 className="text-xl font-bold">Preference Directory</h2>
              <p className="text-sm text-white/50">
                User-level notification configuration
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <h3 className="text-lg font-black">User #{pref.user_id}</h3>

                    <p className="mt-1 text-sm text-white/50">
                      Role: {pref.role}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Forecast</p>
                        <p className="font-bold">
                          {pref.forecast_alerts ? "Enabled" : "Disabled"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">Approval</p>
                        <p className="font-bold">
                          {pref.approval_alerts ? "Enabled" : "Disabled"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 p-3">
                        <p className="text-xs text-white/40">KPI</p>
                        <p className="font-bold">
                          {pref.kpi_alerts ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => toggleEmail(pref)}
                      className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
                        pref.email_enabled
                          ? "bg-emerald-500 text-white"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Mail size={16} />
                      Email
                    </button>

                    <button
                      onClick={() => toggleInApp(pref)}
                      className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${
                        pref.in_app_enabled
                          ? "bg-cyan-500 text-white"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Monitor size={16} />
                      In-App
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {preferences.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
                <CheckCircle2 className="mx-auto mb-4 text-white/40" size={44} />
                <p className="font-bold">No notification preferences found</p>
                <p className="text-sm text-white/50">
                  Create user preferences to control alert delivery.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}