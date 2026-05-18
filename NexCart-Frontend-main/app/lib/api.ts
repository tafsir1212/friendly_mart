// app/lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

// Base URL pointing to the NestJS backend (adjust if proxy differs)
const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token from cookies
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
