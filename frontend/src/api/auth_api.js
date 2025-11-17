import apiClient from "./apiClient";

export const loginUser = (data) => apiClient.post("/auth/login", data);

export const signupUser = (data) => apiClient.post("/auth/signup", data);
