import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export const createKPITrend = (data) =>
  axios.post(`${API_URL}/api/kpi-trends/`, data);

export const getOrganizationKPITrends = (organizationId) =>
  axios.get(
    `${API_URL}/api/kpi-trends/organization/${organizationId}`
  );

export const getKPITrendChart = (kpiId) =>
  axios.get(
    `${API_URL}/api/kpi-trends/chart/${kpiId}`
  );