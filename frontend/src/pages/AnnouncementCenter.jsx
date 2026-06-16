import { useEffect, useState } from "react";
import { Megaphone, Plus, CheckCircle2 } from "lucide-react";
import {
  createAnnouncement,
  getAnnouncements,
} from "../api/announcementApi";

export default function AnnouncementCenter() {
  const [organizationId, setOrganizationId] = useState(1);
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    priority: "normal",
    target_role: "all",
    created_by: 1,
  });

  const loadAnnouncements = async () => {
    const res = await getAnnouncements(organizationId);
    setAnnouncements(res.data);
  };

  useEffect(() => {
    loadAnnouncements();
  }, [organizationId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    await createAnnouncement({
      ...form,
      organization_id: Number(organizationId),
      created_by: Number(form.created_by),
    });

    setForm({
      title: "",
      message: "",
      priority: "normal",
      target_role: "all",
      created_by: 1,
    });

    loadAnnouncements();
    alert("Announcement created successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
            <Megaphone size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-black">Announcement Center</h1>
            <p className="text-white/60">
              Create organization-wide announcements and role-based broadcasts.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreate}
          className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create Announcement</h2>
              <p className="text-sm text-white/50">Broadcast to users</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="number"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              placeholder="Organization ID"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none"
              required
            />

            <input
              name="created_by"
              value={form.created_by}
              onChange={handleChange}
              placeholder="Created By User ID"
              type="number"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none"
              required
            />

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Announcement Title"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Announcement Message"
              rows="5"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 outline-none"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            <select
              name="target_role"
              value={form.target_role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 p-4 outline-none"
            >
              <option value="all">All Users</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="analyst">Analyst</option>
              <option value="viewer">Viewer</option>
            </select>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 py-4 font-bold shadow-xl">
              <Plus size={18} />
              Publish Announcement
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <Megaphone className="text-cyan-300" />
            <div>
              <h2 className="text-xl font-bold">Announcement History</h2>
              <p className="text-sm text-white/50">
                Organization-wide broadcast records
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/60">
                      {item.message || "No message"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                        {item.target_role}
                      </span>

                      <span className="rounded-full bg-fuchsia-400/10 px-3 py-1 text-xs font-bold text-fuchsia-300">
                        {item.priority}
                      </span>

                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  <CheckCircle2 className="text-emerald-300" />
                </div>
              </div>
            ))}

            {announcements.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/10 p-10 text-center">
                <Megaphone className="mx-auto mb-4 text-white/40" size={44} />
                <p className="font-bold">No announcements found</p>
                <p className="text-sm text-white/50">
                  Create announcements to notify organization users.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}