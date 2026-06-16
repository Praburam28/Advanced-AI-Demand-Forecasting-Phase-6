import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getDataQuality = (organizationId) =>
  axios.get(`${API_URL}/api/data-quality/${organizationId}`);

export const getDataQualitySummary = (organizationId) =>
  axios.get(`${API_URL}/api/data-quality/summary/${organizationId}`);