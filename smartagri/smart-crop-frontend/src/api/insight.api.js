import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: API_BASE
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Yield
export const getYieldInsight = (data) =>
  API.post("/yield/predict", data);

// Fertilizer
export const getFertilizerInsight = (data) =>
  API.post("/fertilizer/recommend", data);

// Irrigation
export const getIrrigationInsight = (data) =>
  API.post("/irrigation/recommend", data);