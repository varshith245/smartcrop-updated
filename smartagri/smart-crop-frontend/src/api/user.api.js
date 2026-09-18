// src/api/user.api.js

import axios from "axios";
import { API_BASE } from "./axios";

// ===============================
// AXIOS INSTANCE WITH TOKEN
// ===============================
const API = axios.create({
  baseURL: API_BASE,
});

// ===============================
// ATTACH JWT TOKEN
// ===============================
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ===============================
// USER APIs
// ===============================

export const getUserByEmail = (email) =>
  API.get(`/users/email?email=${email}`);
// GET USER BY ID
export const getUserById = (id) =>
  API.get(`/users/${id}`);

// GET ALL USERS (ADMIN)
export const getAllUsers = () =>
  API.get("/users");

// DELETE USER
export const deleteUser = (id) =>
  API.delete(`/users/${id}`);

// ACTIVATE USER
export const activateUser = (id) =>
  API.put(`/users/${id}/activate`);

// DEACTIVATE USER
export const deactivateUser = (id) =>
  API.put(`/users/${id}/deactivate`);