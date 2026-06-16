import { useState } from "react";
import {
  Moon,
  Sun,
  Bell,
  Shield,
  Save,
  Palette,
  Lock,
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem("theme") === "dark",
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
  });

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "theme",
      settings.darkMode ? "dark" : "light"
    );

    document.documentElement.classList.toggle(
      "dark",
      settings.darkMode
    );

    alert("Settings saved successfully");
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 p-8 text-white">
        <h1 className="text-4xl font-black">
          System Settings
        </h1>

        <p className="mt-3 text-white/80">
          Manage themes, notifications, security and preferences.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="text-violet-600" />
          <h2 className="text-xl font-bold">Appearance</h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Dark Mode</p>
            <p className="text-sm text-slate-500">
              Switch between light and dark theme.
            </p>
          </div>

          <button
            onClick={() => toggleSetting("darkMode")}
            className={`p-3 rounded-xl ${
              settings.darkMode
                ? "bg-slate-900 text-white"
                : "bg-slate-200"
            }`}
          >
            {settings.darkMode ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-cyan-600" />
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <span>Email Notifications</span>

            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() =>
                toggleSetting("emailNotifications")
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Push Notifications</span>

            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() =>
                toggleSetting("pushNotifications")
              }
            />
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-green-600" />
          <h2 className="text-xl font-bold">Security</h2>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Two Factor Authentication
            </p>

            <p className="text-sm text-slate-500">
              Add extra security to your account.
            </p>
          </div>

          <button
            onClick={() =>
              toggleSetting("twoFactorAuth")
            }
            className={`px-4 py-2 rounded-xl ${
              settings.twoFactorAuth
                ? "bg-green-600 text-white"
                : "bg-slate-200"
            }`}
          >
            <Lock size={18} />
          </button>
        </div>
      </div>

      <button
        onClick={saveSettings}
        className="btn-primary flex items-center gap-2"
      >
        <Save size={18} />
        Save Settings
      </button>
    </div>
  );
};

export default Settings;