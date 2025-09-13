import axios from "axios";

// ✅ Use environment variable with fallback
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://rentlyst.onrender.com/api",
});

export default API;
