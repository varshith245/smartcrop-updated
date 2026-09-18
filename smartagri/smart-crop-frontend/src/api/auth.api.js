// src/api/auth.api.js

import axios from "axios";
import { API_BASE } from "./axios";

const API = axios.create({
  baseURL: `${API_BASE}/auth`,
  headers: {
    "Content-Type": "application/json"
  }
});

// REGISTER
export const registerUser = (data) =>
  API.post("/register", data);

// VERIFY OTP
export const verifyOtp = (data) =>
  API.post("/verify-otp", data);

// LOGIN
export const loginUser = (data) =>
  API.post("/login", data);