import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
} from "lucide-react";

const TopNavbar = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Forecast User",
      email: "user@forecastai.com",
    };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search anything... (Ctrl + K)"
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => navigate("/notifications")}
            className="relative h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center"
          >
            <Settings size={18} />
          </button>

          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="h-12 w-12 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white flex items-center justify-center shadow-lg"
          >
            <User size={18} />
          </button>

          <button
            onClick={logout}
            className="h-11 w-11 rounded-2xl bg-red-500 text-white flex items-center justify-center"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;