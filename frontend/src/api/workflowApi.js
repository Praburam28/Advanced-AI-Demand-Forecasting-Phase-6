import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getWorkflows = (organizationId) =>
  axios.get(`${API_URL}/api/workflows/${organizationId}`);

export const getWorkflowSummary = (organizationId) =>
  axios.get(`${API_URL}/api/workflows/summary/${organizationId}`);

export const createWorkflow = (data) =>
  axios.post(`${API_URL}/api/workflows/`, data);

export const executeWorkflow = (id) =>
  axios.post(`${API_URL}/api/workflows/${id}/execute`);