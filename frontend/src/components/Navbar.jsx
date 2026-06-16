import {
  Bell,
  Search,
  UserCircle2,
  Sparkles,
  Zap,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyTheme, getSavedTheme } from "../utils/theme";

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getSavedTheme());

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-2xl bg-white/70 dark:bg-slate-950/70 border-b border-white/70 dark:border-slate-800 shadow-sm">
      <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-white">
              <Zap size={18} />
            </div>

            <h1 className="text-xl lg:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-950 via-violet-700 to-fuchsia-600 dark:from-white dark:via-cyan-300 dark:to-fuchsia-300 bg-clip-text text-transparent">
              AI Demand Forecasting Suite
            </h1>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Forecasting • Executive BI • AI Insights • Collaboration
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 border border-white dark:border-slate-700 rounded-2xl px-4 py-2.5 w-96 shadow-sm">
            <Search size={18} className="text-violet-500" />
            <input
              placeholder="Search reports, datasets, forecasts..."
              className="bg-transparent outline-none text-sm w-full text-slate-800 dark:text-white placeholder:text-slate-400"
            />
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 text-white">
            <Sparkles size={16} />
            <span className="text-sm font-bold">AI Powered</span>
          </div>

          <button
            onClick={toggleTheme}
            className="h-12 w-12 rounded-2xl bg-white/80 dark:bg-slate-900 border border-white dark:border-slate-700 flex items-center justify-center hover:scale-105 transition"
          >
            {theme === "dark" ? (
              <Sun size={19} className="text-yellow-400" />
            ) : (
              <Moon size={19} className="text-violet-600" />
            )}
          </button>

          <button className="relative h-12 w-12 rounded-2xl bg-white/80 dark:bg-slate-900 border border-white dark:border-slate-700 flex items-center justify-center">
            <Bell size={19} className="text-slate-700 dark:text-slate-200" />
            <span className="absolute top-2.5 right-2.5 h-3 w-3 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-900 border border-white dark:border-slate-700 rounded-2xl px-4 py-2">
            <UserCircle2 size={30} className="text-blue-600 dark:text-cyan-400" />

            <div className="hidden md:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {user?.name || "Forecast User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.role || "Data Analyst"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="h-12 w-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white flex items-center justify-center"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;