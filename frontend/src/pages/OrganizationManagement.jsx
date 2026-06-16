import { useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";
import {
  getOrganizations,
  createOrganization,
  deleteOrganization,
} from "../api/organizationApi";

export default function OrganizationManagement() {
  const [organizations, setOrganizations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchOrganizations = async () => {
    const res = await getOrganizations();
    setOrganizations(res.data);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createOrganization(form);
    setForm({
      name: "",
      industry: "",
      email: "",
      phone: "",
      address: "",
    });
    fetchOrganizations();
  };

  const handleDelete = async (id) => {
    await deleteOrganization(id);
    fetchOrganizations();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6 text-white">
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles size={16} />
              Phase 6 Enterprise Control
            </div>

            <h1 className="text-4xl font-black tracking-tight">
              Organization Management
            </h1>

            <p className="mt-2 max-w-2xl text-white/60">
              Create and manage multi-organization SaaS workspaces with
              dedicated dashboards, datasets, forecasts and reports.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-center">
              <p className="text-3xl font-black">{organizations.length}</p>
              <p className="text-xs text-white/50">Organizations</p>
            </div>

            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-center">
              <p className="text-3xl font-black">
                {organizations.filter((o) => o.is_active).length}
              </p>
              <p className="text-xs text-white/50">Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form
          onSubmit={handleCreate}
          className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-lg">
              <Plus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create Organization</h2>
              <p className="text-sm text-white/50">Add a new SaaS workspace</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Organization Name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
              required
            />

            <input
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="Industry"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
            />

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              rows="3"
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-white/40 focus:border-cyan-300"
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 px-5 py-4 font-bold text-white shadow-xl shadow-fuchsia-950/40 transition hover:scale-[1.02]">
              <Plus size={18} />
              Create Organization
            </button>
          </div>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Organization Directory</h2>
              <p className="text-sm text-white/50">
                Manage all enterprise organizations
              </p>
            </div>
            <Building2 className="text-cyan-300" size={30} />
          </div>

          <div className="grid gap-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="group rounded-3xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-cyan-300/40 hover:bg-white/10"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500">
                      <Building2 size={24} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-black">{org.name}</h3>
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                          {org.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2 text-sm text-white/60 md:grid-cols-2">
                        <p className="flex items-center gap-2">
                          <BriefcaseBusiness size={15} />
                          {org.industry || "No industry"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail size={15} />
                          {org.email || "No email"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={15} />
                          {org.phone || "No phone"}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={15} />
                          {org.address || "No address"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(org.id)}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {organizations.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 bg-slate-950/30 p-10 text-center">
                <Building2 className="mx-auto mb-4 text-white/40" size={42} />
                <p className="font-bold">No organizations found</p>
                <p className="text-sm text-white/50">
                  Create your first organization to start Phase 6 enterprise
                  management.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}