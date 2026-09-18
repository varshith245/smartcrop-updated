// src/api/crop.api.js

import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: `${API_BASE}/crops`,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization =
    `Bearer ${localStorage.getItem("token")}`;
  return req;
});

// Get all crops
export const getAllCrops = () => API.get("");

// Get crops by farm
export const getCropsByFarm = (farmId) =>
  API.get(`/farm/${farmId}`);

// Delete crop
export const deleteCrop = (id) =>
  API.delete(`/${id}`);
// Update crop
export const updateCrop = (id, data) =>
  API.put(`/${id}`, data);