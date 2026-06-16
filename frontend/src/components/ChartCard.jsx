import { MoreHorizontal } from "lucide-react";

const ChartCard = ({ title, subtitle, children }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/70 dark:border-slate-800 shadow-xl shadow-slate-200/70 dark:shadow-black/30">
      <div className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br from-violet-400/20 to-cyan-400/20 blur-2xl" />

      <div className="relative p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <button className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition">
          <MoreHorizontal size={18} className="dark:text-white" />
        </button>
      </div>

      <div className="relative p-5">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;