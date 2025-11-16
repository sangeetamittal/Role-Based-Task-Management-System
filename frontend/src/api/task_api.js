import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// GET all tasks
export const getTasks = (params) => API.get("/", {params});

// GET single task
export const getTaskById = (id) => API.get(`/${id}`);

// CREATE task
export const createTask = (data) => API.post("/", data);

// UPDATE task
export const updateTask = (id, data) => API.put(`/${id}`, data);

// DELETE task
export const deleteTask = (id) => API.delete(`/${id}`);
