import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", 
});

// LOGIN
export const loginUser = async (data) => {
  return await API.post("/login", data);
};

// SIGNUP
export const signupUser = async (data) => {
  return await API.post("/signup", data);
};
