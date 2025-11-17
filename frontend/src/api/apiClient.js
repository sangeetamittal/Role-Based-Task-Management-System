import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach token for every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle expired token
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    console.log("Interceptor:", status, message);

    // LOGOUT only for token-related issues
    const tokenErrors = [
      "Invalid or expired token",
      "No token provided"
    ];

    if (status === 401 || (status === 403 && tokenErrors.includes(message))) {
      console.log("TOKEN ISSUE → Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Do NOT logout on role error
    return Promise.reject(error);
  }
);


export default apiClient;