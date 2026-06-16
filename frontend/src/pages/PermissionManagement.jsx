import { useEffect, useState } from "react";
import API from "../api/api";
import {
  ShieldCheck,
  UserPlus,
  Users,
  Trash2,
  LockKeyhole,
  Sparkles,
  Crown,
  UserCog,
  Eye,
  Pencil,
  Rocket,
  Layers,
  Settings,
} from "lucide-react";

import StatCard from "../components/StatCard";

const PermissionManagement = () => {
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [form, setForm] = useState({
    project_id: "",
    user_id: "",
    role: "viewer",
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get("/workspaces/");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const fetchPermissions = async (projectId) => {
    if (!projectId) return;

    try {
      const res = await API.get(`/permissions/project/${projectId}`);
      setPermissions(res.data);
      setSelectedProjectId(projectId);
    } catch (error) {
      alert("Failed to fetch permissions");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addPermission = async (e) => {
    e.preventDefault();

    if (!form.project_id || !form.user_id || !form.role) {
      alert("Project, user ID and role are required");
      return;
    }

    try {
      await API.post("/permissions/", {
        project_id: Number(form.project_id),
        user_id: Number(form.user_id),
        role: form.role,
      });

      alert("Permission saved successfully");

      setForm({
        project_id: form.project_id,
        user_id: "",
        role: "viewer",
      });

      fetchPermissions(form.project_id);
    } catch (error) {
      alert("Permission update failed");
    }
  };

  const removePermission = async (permissionId) => {
    try {
      await API.delete(`/permissions/${permissionId}`);
      fetchPermissions(selectedProjectId);
      alert("Permission removed successfully");
    } catch (error) {
      alert("Failed to remove permission");
    }
  };

  const roleStyle = {
    owner:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    admin:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    editor:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    viewer:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  const roleIcon = {
    owner: Crown,
    admin: ShieldCheck,
    editor: Pencil,
    viewer: Eye,
  };

  const selectedProject = projects.find(
    (project) => String(project.id) === String(selectedProjectId)
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-500 p-8 text-white shadow-2xl shadow-fuchsia-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <ShieldCheck size={16} />
              Role-Based Access Control
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Secure Project Permissions
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Manage project-level access for owners, admins, editors and
              viewers with secure role-based permissions for forecasting
              workspaces.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-violet-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Add Permission
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View Roles
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Permissions</p>
                  <h2 className="text-5xl font-black mt-2">
                    {permissions.length}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Projects</p>
                  <p className="font-black mt-1">{projects.length}</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Roles</p>
                  <p className="font-black mt-1">4</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">RBAC</p>
                  <p className="font-black mt-1">On</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Projects"
          value={projects.length}
          subtitle="Available workspaces"
          icon={Layers}
          gradient="from-cyan-500 to-blue-600"
        />

        <StatCard
          title="Permissions"
          value={permissions.length}
          subtitle="Selected project access"
          icon={ShieldCheck}
          gradient="from-violet-600 to-fuchsia-600"
        />

        <StatCard
          title="Team Roles"
          value="4"
          subtitle="Owner, admin, editor, viewer"
          icon={Users}
          gradient="from-emerald-500 to-teal-500"
        />

        <StatCard
          title="Access Control"
          value="Enabled"
          subtitle="RBAC security active"
          icon={LockKeyhole}
          gradient="from-orange-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          {
            title: "Owner",
            text: "Full project control and permission management.",
            icon: Crown,
            gradient: "from-purple-600 to-fuchsia-600",
          },
          {
            title: "Admin",
            text: "Manage users, reports and project actions.",
            icon: ShieldCheck,
            gradient: "from-blue-500 to-indigo-600",
          },
          {
            title: "Editor",
            text: "Create and update forecasts, datasets and scenarios.",
            icon: Pencil,
            gradient: "from-emerald-500 to-cyan-500",
          },
          {
            title: "Viewer",
            text: "Read-only access to reports and dashboards.",
            icon: Eye,
            gradient: "from-orange-500 to-rose-500",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.gradient} p-6 text-white shadow-xl`}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
              <Icon size={32} />
              <h3 className="font-black text-xl mt-4">{item.title}</h3>
              <p className="text-sm text-white/75 mt-2">{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <form onSubmit={addPermission} className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <UserPlus size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Add / Update Permission
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Assign a user role to a forecast project.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Project
              </label>

              <select
                value={form.project_id}
                onChange={(e) => {
                  setForm({ ...form, project_id: e.target.value });
                  fetchPermissions(e.target.value);
                }}
                className="input mt-1"
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                User ID
              </label>

              <input
                type="number"
                value={form.user_id}
                onChange={(e) =>
                  setForm({ ...form, user_id: e.target.value })
                }
                placeholder="Enter user ID"
                className="input mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Role
              </label>

              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="input mt-1"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <ShieldCheck size={18} />
              Save Permission
            </button>
          </div>
        </form>

        <div className="xl:col-span-2 card overflow-hidden">
          <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Project Permissions
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {selectedProject
                  ? `Viewing permissions for ${selectedProject.name}`
                  : "Select a project to view assigned roles."}
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
              <Settings size={22} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left p-4">Permission</th>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Project</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {permissions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-slate-500 dark:text-slate-400"
                    >
                      No permissions found for selected project.
                    </td>
                  </tr>
                ) : (
                  permissions.map((permission) => {
                    const RoleIcon = roleIcon[permission.role] || UserCog;

                    return (
                      <tr
                        key={permission.id}
                        className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
                              <RoleIcon size={18} />
                            </div>

                            <div>
                              <p className="font-black text-slate-900 dark:text-white">
                                Permission #{permission.id}
                              </p>
                              <p className="text-xs text-slate-400">
                                Access record
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-slate-700 dark:text-slate-200">
                          User #{permission.user_id}
                        </td>

                        <td className="p-4 text-slate-700 dark:text-slate-200">
                          Project #{permission.project_id}
                        </td>

                        <td className="p-4">
                          <span
                            className={`badge ${
                              roleStyle[permission.role] ||
                              "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            }`}
                          >
                            {permission.role}
                          </span>
                        </td>

                        <td className="p-4 text-slate-600 dark:text-slate-300">
                          {permission.created_at
                            ? new Date(permission.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => removePermission(permission.id)}
                            className="text-rose-600 dark:text-rose-300 font-bold flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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
              Permission Management Module Ready
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Supports project ownership, admin/editor/viewer roles, team security,
              and role-based forecasting workspace access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionManagement;