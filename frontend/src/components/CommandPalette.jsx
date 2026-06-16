import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const commands = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Datasets", path: "/datasets" },
  { name: "Forecast", path: "/forecast" },
  { name: "Workspace", path: "/workspace" },
  { name: "Scenarios", path: "/scenarios" },
  { name: "Analytics", path: "/dashboard-analytics" },
  { name: "AI Insights", path: "/ai-insights" },
  { name: "Reports", path: "/reports" },
  { name: "Executive Reports", path: "/executive-reports" },
  { name: "Notifications", path: "/notifications" },
  { name: "Users", path: "/users" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
];

const CommandPalette = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const filtered = commands.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex justify-center pt-24">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b p-4">
          <Search size={20} />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filtered.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="w-full text-left px-5 py-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;