import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const createOrganizationSettings = (data) =>
  axios.post(`${API_URL}/api/organization-settings/`, data);

export const getOrganizationSettings = (organizationId) =>
  axios.get(`${API_URL}/api/organization-settings/${organizationId}`);

export const updateOrganizationSettings = (organizationId, data) =>
  axios.put(`${API_URL}/api/organization-settings/${organizationId}`, data);