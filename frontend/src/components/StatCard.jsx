const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient = "from-violet-600 via-fuchsia-500 to-cyan-400",
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/70 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/70 dark:shadow-black/30 hover:-translate-y-1 transition-all duration-300">
      <div
        className={`absolute -top-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br ${gradient} opacity-25 blur-2xl`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
            {value}
          </h3>

          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg`}
          >
            <Icon size={26} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;