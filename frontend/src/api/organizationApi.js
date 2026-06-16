import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getOrganizations = () => axios.get(`${API_URL}/api/organizations/`);
export const createOrganization = (data) => axios.post(`${API_URL}/api/organizations/`, data);
export const updateOrganization = (id, data) => axios.put(`${API_URL}/api/organizations/${id}`, data);
export const deleteOrganization = (id) => axios.delete(`${API_URL}/api/organizations/${id}`);