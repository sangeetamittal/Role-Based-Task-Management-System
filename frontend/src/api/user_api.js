import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

// attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// GET all users (Admin only)
export const getAllUsers = (params) => API.get("/", {params});

// UPDATE role
export const updateUserRole = (id, data) =>
  API.patch(`/${id}/role`, data);

// DELETE user
export const deleteUser = (id) => API.delete(`/${id}`);