import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: API_BASE
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// get settings
export const getSettings = () => API.get("/settings");

// save settings
export const saveSettings = (data) => API.post("/settings", data);