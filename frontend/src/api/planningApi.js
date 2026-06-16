import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getPlans = (organizationId) =>
  axios.get(`${API_URL}/api/strategic-planning/${organizationId}`);

export const getPlanningSummary = (organizationId) =>
  axios.get(`${API_URL}/api/strategic-planning/summary/${organizationId}`);

export const createPlan = (data) =>
  axios.post(`${API_URL}/api/strategic-planning/`, data);