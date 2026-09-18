// src/api/fertilizer.api.js

import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: `${API_BASE}/fertilizer`,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization =
    `Bearer ${localStorage.getItem("token")}`;
  return req;
});

// Recommend fertilizer
export const recommendFertilizer = (data) =>
  API.post("/recommend", data);

// Get all fertilizers
export const getAllFertilizers = () =>
  API.get("/all");