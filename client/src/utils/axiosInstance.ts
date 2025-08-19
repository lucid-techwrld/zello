import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/", // fallback for local dev
  withCredentials: true,
});

export default API;
