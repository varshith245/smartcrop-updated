import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: API_BASE
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// send notification (admin)
export const sendNotification = (data) =>
  API.post("/notifications", data);

// get notifications (farmer)
export const getUserNotifications = (userId) =>
  API.get(`/notifications/user/${userId}`);