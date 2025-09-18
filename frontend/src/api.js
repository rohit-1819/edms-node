import axios from "axios";
console.log("BASE URL:", import.meta.env.VITE_API_BASE_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // your Render backend URL
});

// Add auth token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
