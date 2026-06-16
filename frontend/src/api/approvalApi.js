import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getApprovals = (organizationId) =>
  axios.get(`${API_URL}/api/forecast-approvals/${organizationId}`);

export const submitApproval = (data) =>
  axios.post(`${API_URL}/api/forecast-approvals/`, data);

export const reviewApproval = (id, data) =>
  axios.put(`${API_URL}/api/forecast-approvals/${id}/review`, data);