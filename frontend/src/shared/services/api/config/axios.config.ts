// src/services/api.ts
import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
