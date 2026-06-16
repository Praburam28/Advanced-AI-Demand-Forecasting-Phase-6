import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getExecutiveCommandSummary = (organizationId) =>
  axios.get(`${API_URL}/api/executive-command/${organizationId}`);