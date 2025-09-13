import axios from "axios";

// ✅ Use environment variable with fallback
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default API;
