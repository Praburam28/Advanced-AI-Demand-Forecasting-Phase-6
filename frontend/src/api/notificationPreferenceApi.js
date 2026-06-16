import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getNotificationPreferences = (organizationId) =>
  axios.get(`${API_URL}/api/notification-preferences/${organizationId}`);

export const createNotificationPreference = (data) =>
  axios.post(`${API_URL}/api/notification-preferences/`, data);

export const updateNotificationPreference = (id, data) =>
  axios.put(`${API_URL}/api/notification-preferences/${id}`, data);