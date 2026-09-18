import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: `${API_BASE}/yield`
});

API.interceptors.request.use((req) => {
  req.headers.Authorization =
    `Bearer ${localStorage.getItem("token")}`;
  return req;
});

export const predictYield = (data) =>
  API.post("/predict", data);

export const getAllYields = () =>
  API.get("/all");