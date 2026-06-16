import { Building2 } from "lucide-react";
import { useOrganization } from "../context/OrganizationContext";

export default function OrganizationSelector() {
  const { organizations, selectedOrganization, setSelectedOrganization } =
    useOrganization();

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white">
      <Building2 size={18} className="text-cyan-300" />

      <select
        value={selectedOrganization?.id || ""}
        onChange={(e) => {
          const org = organizations.find(
            (item) => item.id === Number(e.target.value)
          );
          setSelectedOrganization(org);
        }}
        className="bg-transparent outline-none"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id} className="bg-slate-900">
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
}