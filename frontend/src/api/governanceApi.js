import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getGovernanceRecords = (organizationId) =>
  axios.get(`${API_URL}/api/governance/${organizationId}`);

export const getGovernanceSummary = (organizationId) =>
  axios.get(`${API_URL}/api/governance/summary/${organizationId}`);

export const createGovernanceRecord = (data) =>
  axios.post(`${API_URL}/api/governance/`, data);