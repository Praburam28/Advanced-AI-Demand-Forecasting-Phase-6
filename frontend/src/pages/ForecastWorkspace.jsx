import { useEffect, useState } from "react";
import API from "../api/api";
import {
  FolderKanban,
  Plus,
  Users,
  Activity,
  Sparkles,
  ShieldCheck,
  Clock,
  Trash2,
  Eye,
  Rocket,
  Layers,
} from "lucide-react";

import StatCard from "../components/StatCard";

const ForecastWorkspace = () => {
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get("/workspaces/");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const fetchActivities = async (projectId) => {
    try {
      const res = await API.get(`/activities/project/${projectId}`);
      setActivities(res.data);
      setSelectedProjectId(projectId);
    } catch (error) {
      console.error("Failed to fetch activities", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Project name is required");
      return;
    }

    try {
      await API.post("/workspaces/", form);
      setForm({ name: "", description: "" });
      fetchProjects();
      alert("Workspace created successfully");
    } catch (error) {
      alert("Workspace creation failed");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await API.delete(`/workspaces/${projectId}`);
      fetchProjects();
      alert("Workspace deleted successfully");
    } catch (error) {
      alert("Delete failed");
    }
  };

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600 via-fuchsia-600 to-violet-700 p-8 text-white shadow-2xl shadow-fuchsia-500/30">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-20 h-56 w-56 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl">
              <FolderKanban size={16} />
              Forecast Workspace Management
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mt-5 leading-tight">
              Organize Forecasting Workspaces
            </h1>

            <p className="text-white/80 mt-4 max-w-2xl">
              Create forecast projects, organize datasets, connect forecasts,
              manage reports, assign permissions, and monitor activity from one
              professional workspace hub.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-white text-fuchsia-700 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition">
                Create Workspace
              </button>

              <button className="bg-white/20 border border-white/30 text-white px-5 py-3 rounded-2xl font-bold backdrop-blur-xl hover:bg-white/30 transition">
                View Activity
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/15 border border-white/20 backdrop-blur-xl rounded-[2rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Workspaces</p>
                  <h2 className="text-5xl font-black mt-2">
                    {projects.length}
                  </h2>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Rocket size={42} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Owner</p>
                  <p className="font-black mt-1">Enabled</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Permissions</p>
                  <p className="font-black mt-1">RBAC</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4">
                  <p className="text-xs text-white/60">Timeline</p>
                  <p className="font-black mt-1">Live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={createProject} className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white flex items-center justify-center">
            <Plus size={24} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Create Forecast Project
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add a new workspace to group datasets, scenarios, forecasts, and reports.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Project name"
            className="input"
          />

          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description"
            className="input md:col-span-2"
          />

          <button className="btn-primary flex items-center justify-center gap-2">
            <Plus size={18} />
            Create Project
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Projects"
          value={projects.length}
          subtitle="Forecasting workspaces"
          icon={FolderKanban}
          gradient="from-orange-500 to-fuchsia-600"
        />

        <StatCard
          title="Permissions"
          value="RBAC"
          subtitle="Owner, admin, editor, viewer"
          icon={ShieldCheck}
          gradient="from-violet-600 to-indigo-600"
        />

        <StatCard
          title="Activity Events"
          value={activities.length}
          subtitle="Timeline records"
          icon={Activity}
          gradient="from-emerald-500 to-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 card overflow-hidden">
          <div className="p-6 border-b border-white/70 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Forecast Projects
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage project ownership, permissions, status, and activity.
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex items-center justify-center">
              <Layers size={22} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/60 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="text-left p-4">Project</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Permission</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-6 text-slate-500 dark:text-slate-400"
                    >
                      No forecast projects created yet.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-t border-white/70 dark:border-slate-800 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white flex items-center justify-center">
                            <FolderKanban size={18} />
                          </div>

                          <div>
                            <p className="font-black text-slate-900 dark:text-white">
                              {project.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              Project #{project.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {project.description || "No description"}
                      </td>

                      <td className="p-4">
                        <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                          {project.permission_level}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="badge bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {project.status}
                        </span>
                      </td>

                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {project.created_at
                          ? new Date(project.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => fetchActivities(project.id)}
                            className="text-cyan-600 dark:text-cyan-300 font-bold flex items-center gap-1"
                          >
                            <Eye size={16} />
                            Activity
                          </button>

                          <button
                            onClick={() => deleteProject(project.id)}
                            className="text-rose-600 dark:text-rose-300 font-bold flex items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center">
              <Activity size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Activity Timeline
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {selectedProject
                  ? selectedProject.name
                  : selectedProjectId
                  ? `Project ID: ${selectedProjectId}`
                  : "Select a project to view activities"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5 max-h-[520px] overflow-y-auto pr-2">
            {activities.length === 0 ? (
              <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No activities to display.
                </p>
              </div>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="relative pl-6">
                  <div className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-cyan-400 to-violet-500" />
                  <div className="absolute left-[-7px] top-1 h-4 w-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-4 ring-white dark:ring-slate-900" />

                  <div className="bg-white/70 dark:bg-slate-800/70 border border-white dark:border-slate-700 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-cyan-500" />
                      <p className="text-sm font-black text-slate-800 dark:text-white">
                        {activity.action}
                      </p>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {activity.description}
                    </p>

                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-3">
                      {activity.created_at
                        ? new Date(activity.created_at).toLocaleString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl">
          <Sparkles size={32} />
          <h3 className="font-black text-xl mt-4">Workspace Intelligence</h3>
          <p className="text-sm text-white/75 mt-2">
            Each project groups datasets, forecasts, reports, scenarios, and collaboration history.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-6 text-white shadow-xl">
          <Users size={32} />
          <h3 className="font-black text-xl mt-4">Team Ready</h3>
          <p className="text-sm text-white/75 mt-2">
            Project-level roles support secure team collaboration and controlled access.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-6 text-white shadow-xl">
          <Activity size={32} />
          <h3 className="font-black text-xl mt-4">Audit Timeline</h3>
          <p className="text-sm text-white/75 mt-2">
            Track workspace creation, updates, dataset changes, reports, and forecast activity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForecastWorkspace;