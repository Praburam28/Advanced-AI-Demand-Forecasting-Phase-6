import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  LineChart,
  FolderKanban,
  SlidersHorizontal,
  BriefcaseBusiness,
  Brain,
  MessageSquare,
  BarChart3,
  FileText,
  Bell,
  Users,
  Plug,
  ShieldCheck,
  Share2,
  GitCompare,
  CalendarClock,
  Sparkles,
  Rocket,
  UserCircle,
  Settings,
  Building2,
  FileCheck2,
  GitBranch,
  DatabaseZap,
  Target,
  CalendarDays,
  Workflow,
  Command,
  Megaphone,
} from "lucide-react";


const sections = [
  {
    title: "Main",
    links: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/datasets", label: "Datasets", icon: Database },
      { to: "/forecast", label: "Forecast", icon: LineChart },
      { to: "/workspace", label: "Workspace", icon: FolderKanban },
      { to: "/scenarios", label: "Scenarios", icon: SlidersHorizontal },
      { to: "/announcement-center", label: "Announcements", icon: Megaphone,}
    ],
  },
  {
    title: "Enterprise Phase 6",
    links: [
      { to: "/organizations", label: "Organizations", icon: Building2 },
      { to: "/forecast-approvals", label: "Approvals", icon: FileCheck2 },
      { to: "/governance-center", label: "Governance", icon: GitBranch },
      { to: "/data-quality-center", label: "Data Quality", icon: DatabaseZap },
      { to: "/kpi-management", label: "KPI Management", icon: Target },
      { to: "/kpi-analytics", label: "KPI Analytics", icon: BarChart3, },
      { to: "/strategic-planning", label: "Strategic Planning", icon: CalendarDays },
      { to: "/workflow-automation", label: "Workflow Automation", icon: Workflow },
      { to: "/executive-command-center", label: "Command Center", icon: Command },
      { to: "/notification-management", label: "Notification Mgmt", icon: Bell },
      { to: "/organization-settings", label: "Org Settings", icon: Settings },
    ],
  },
  {
    title: "AI Intelligence",
    links: [
      { to: "/executive-dashboard", label: "Executive BI", icon: BriefcaseBusiness },
      { to: "/executive-bi-charts", label: "Executive Charts", icon: BarChart3 },
      { to: "/dashboard-analytics", label: "Analytics", icon: BarChart3 },
      { to: "/ai-insights", label: "AI Insights", icon: Brain },
      { to: "/accuracy-center", label: "Accuracy Center", icon: Rocket },
    ],
  },
  {
    title: "Reports",
    links: [
      { to: "/reports", label: "Reports", icon: FileText },
      { to: "/executive-reports", label: "Executive Reports", icon: FileText },
      { to: "/report-sharing", label: "Sharing", icon: Share2 },
      { to: "/report-scheduling", label: "Scheduling", icon: CalendarClock },
      { to: "/collaboration", label: "Collaboration", icon: MessageSquare },
    ],
  },
  {
    title: "Control Center",
    links: [
      { to: "/permissions", label: "Permissions", icon: ShieldCheck },
      { to: "/dataset-comparison", label: "Dataset Compare", icon: GitCompare },
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/users", label: "Users", icon: Users },
      { to: "/profile", label: "Profile", icon: UserCircle },
      { to: "/settings", label: "Settings", icon: Settings },
      { to: "/integrations", label: "Integrations", icon: Plug },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="relative w-80 h-screen sticky top-0 text-white flex flex-col overflow-hidden bg-gradient-to-b from-[#070B1F] via-[#17113B] to-[#2D0B4E] border-r border-white/10">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
      <div className="absolute top-40 -right-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-fuchsia-500/30">
            <Sparkles size={27} />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight">Forecast AI</h1>
            <p className="text-xs text-cyan-100/70">
              Colorful SaaS Intelligence
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-white/10 border border-white/10 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold">Phase 6 Enterprise</p>
              <p className="text-xs text-white/60 mt-1">
                Org + Workflow + Governance
              </p>
            </div>

            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              <Rocket size={20} />
            </div>
          </div>
        </div>
      </div>

      <nav className="relative flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[11px] uppercase tracking-[0.2em] text-white/40 font-black">
              {section.title}
            </p>

            <div className="space-y-1.5">
              {section.links.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-xl shadow-fuchsia-950/40 scale-[1.02]"
                          : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1"
                      }`
                    }
                  >
                    <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20">
                      <Icon size={18} />
                    </div>

                    <span className="font-semibold">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="relative p-4 border-t border-white/10">
        <div className="rounded-3xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-400/20 p-4 border border-white/10 backdrop-blur-xl">
          <p className="text-sm font-bold">AI Forecast Engine</p>
          <p className="text-xs text-white/60 mt-1">
            Predict demand, revenue and business growth.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;