import { createContext, useContext, useEffect, useState } from "react";
import { getOrganizations } from "../api/organizationApi";

const OrganizationContext = createContext();

export function OrganizationProvider({ children }) {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    const loadOrganizations = async () => {
      const res = await getOrganizations();
      setOrganizations(res.data);

      if (res.data.length > 0) {
        setSelectedOrganization(res.data[0]);
      }
    };

    loadOrganizations();
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        selectedOrganization,
        setSelectedOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  return useContext(OrganizationContext);
}