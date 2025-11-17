import apiClient from "./apiClient";

export const getAllUsers = (params) => apiClient.get("/users", { params });

export const updateUserRole = (id, data) =>
  apiClient.patch(`/users/${id}/role`, data);

export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
