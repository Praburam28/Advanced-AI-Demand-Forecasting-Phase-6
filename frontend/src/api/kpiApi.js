import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getKPIs = (organizationId) =>
  axios.get(`${API_URL}/api/kpis/${organizationId}`);

export const getKPISummary = (organizationId) =>
  axios.get(`${API_URL}/api/kpis/summary/${organizationId}`);

export const createKPI = (data) =>
  axios.post(`${API_URL}/api/kpis/`, data);

export const updateKPI = (id, data) =>
  axios.put(`${API_URL}/api/kpis/${id}`, data);

export const deleteKPI = (id) =>
  axios.delete(`${API_URL}/api/kpis/${id}`);