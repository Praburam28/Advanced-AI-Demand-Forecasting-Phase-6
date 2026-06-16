import {
  Users as UsersIcon,
  Plus,
  Shield,
  Sparkles,
  UserCheck,
  UserX,
  Mail,
  Settings,
  Crown,
  BriefcaseBusiness,
  LockKeyhole,
  Rocket,
} from "lucide-react";

import StatCard from "../components/StatCard";

const users = [
  {
    name: "Admin User",
    email: "admin@forecastai.com",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Manager User",
    email: "manager@forecastai.com",
    role: "Manager",
    status: "Active",
  },
  {
    name: "Forecast Analyst",
    email: "analyst@forecastai.com",
    role: "User",
    status: "Inactive",
  },
];

const roleStyle = {
  Admin: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Manager: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  User: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const statusStyle = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Inactive: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const Users = () => {
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const admins = users.filter((user) => user.role === "Admin").length;
  const managers = users.filter((user) => user.role === "Manager").length;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 p-8 text-white shadow-2xl shadow-fuchsia-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <UsersIcon size={16} />
              User & Role Management
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Manage Team Access & Roles
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Manage users, roles, permissions, account status, ownership, and
              secure access control for your demand forecasting SaaS platform.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition flex items-center gap-2">
                <Plus size={18} />
                Add User
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                Manage Roles
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Team Members</p>
                  <h2 className="text-5xl font-black mt-2">{users.length}</h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Active</p>
                  <p className="font-black mt-1">{activeUsers}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Admins</p>
                  <p className="font-black mt-1">{admins}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Managers</p>
                  <p className="font-black mt-1">{managers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Team Members"
          value={users.length}
          subtitle="Total platform users"
          icon={UsersIcon}
          gradient="from-cyan-500 to-blue-600"
        />

        <StatCard
          title="Active Users"
          value={activeUsers}
          subtitle="Currently active"
          icon={UserCheck}
          gradient="from-emerald-500 to-teal-500"
        />

        <StatCard
          title="Admins"
          value={admins}
          subtitle="System administrators"
          icon={Crown}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Managers"
          value={managers}
          subtitle="Business managers"
          icon={BriefcaseBusiness}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <Shield size={32} />
          <h3 className="font-black text-xl mt-4">Role-Based Access</h3>
          <p className="text-sm text-white/75 mt-2">
            Admin, manager, analyst and viewer role separation.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <LockKeyhole size={32} />
          <h3 className="font-black text-xl mt-4">Secure Permissions</h3>
          <p className="text-sm text-white/75 mt-2">
            Control access for forecasts, datasets, projects and reports.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <Settings size={32} />
          <h3 className="font-black text-xl mt-4">User Administration</h3>
          <p className="text-sm text-white/75 mt-2">
            Manage account status, role assignments and team access.
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              User Directory
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage users, emails, roles, account status and access control.
            </p>
          </div>

          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => {
                const initials = user.name
                  .split(" ")
                  .map((item) => item[0])
                  .join("");

                return (
                  <tr
                    key={index}
                    className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center font-black">
                          {initials}
                        </div>

                        <div>
                          <p className="font-black text-slate-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            User #{index + 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-cyan-500" />
                        {user.email}
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`badge ${
                          roleStyle[user.role] ||
                          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`badge ${
                          statusStyle[user.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button className="text-violet-600 dark:text-violet-300 font-bold flex items-center gap-1">
                        <Settings size={16} />
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-blue-950 p-6 text-white shadow-xl">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
            <Sparkles size={28} />
          </div>

          <div>
            <h3 className="text-xl font-black">
              User Management Module Ready
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports user roles, access planning, admin management and secure team workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;