import { useEffect, useState } from "react";
import { Settings, Save, Building2 } from "lucide-react";
import {
  createOrganizationSettings,
  getOrganizationSettings,
  updateOrganizationSettings,
} from "../api/organizationSettingsApi";

import { useOrganization } from "../context/OrganizationContext";
import OrganizationSelector from "../components/OrganizationSelector";

export default function OrganizationSettings() {
  const { selectedOrganization } = useOrganization();
  const organizationId = selectedOrganization?.id;

  const [form, setForm] = useState({
    timezone: "Asia/Kolkata",
    currency: "INR",
    date_format: "DD-MM-YYYY",
    forecast_frequency: "monthly",
    approval_required: true,
    email_notifications: false,
    in_app_notifications: true,
    data_retention_days: 365,
  });

  const [settingsExists, setSettingsExists] = useState(false);

  const loadSettings = async () => {
    if (!organizationId) return;

    try {
      const res = await getOrganizationSettings(organizationId);
      setForm({
        timezone: res.data.timezone,
        currency: res.data.currency,
        date_format: res.data.date_format,
        forecast_frequency: res.data.forecast_frequency,
        approval_required: res.data.approval_required,
        email_notifications: res.data.email_notifications,
        in_app_notifications: res.data.in_app_notifications,
        data_retention_days: res.data.data_retention_days,
      });
      setSettingsExists(true);
    } catch {
      setSettingsExists(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, [organizationId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!organizationId) {
      alert("Please create or select an organization first");
      return;
    }

    const payload = {
      ...form,
      organization_id: Number(organizationId),
      data_retention_days: Number(form.data_retention_days || 365),
    };

    if (settingsExists) {
      await updateOrganizationSettings(organizationId, payload);
    } else {
      await createOrganizationSettings(payload);
    }

    alert("Organization settings saved successfully");
    loadSettings();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Settings size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-black">Organization Settings</h1>
              <p className="text-white/60">
                Configure timezone, currency, approval rules, notification
                preferences and data retention for each organization.
              </p>
            </div>
          </div>

          <OrganizationSelector />
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <Building2 className="text-cyan-300" />
          <div>
            <h2 className="text-xl font-bold">
              {selectedOrganization?.name || "No Organization Selected"}
            </h2>
            <p className="text-sm text-white/50">
              {settingsExists ? "Update existing settings" : "Create settings"}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-bold text-white/70">
              Timezone
            </label>
            <input
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-white/70">
              Currency
            </label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-white/70">
              Date Format
            </label>
            <select
              name="date_format"
              value={form.date_format}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              <option value="MM-DD-YYYY">MM-DD-YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-white/70">
              Forecast Frequency
            </label>
            <select
              name="forecast_frequency"
              value={form.forecast_frequency}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-white/70">
              Data Retention Days
            </label>
            <input
              name="data_retention_days"
              value={form.data_retention_days}
              onChange={handleChange}
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["approval_required", "Approval Required"],
            ["email_notifications", "Email Notifications"],
            ["in_app_notifications", "In-App Notifications"],
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
        </div>

        <button className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-6 py-4 font-bold shadow-xl">
          <Save size={18} />
          Save Settings
        </button>
      </form>
    </div>
  );
}