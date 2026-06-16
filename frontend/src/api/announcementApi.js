import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const createAnnouncement = (data) =>
  axios.post(`${API_URL}/api/announcements/`, data);

export const getAnnouncements = (organizationId) =>
  axios.get(`${API_URL}/api/announcements/${organizationId}`);