import axios from 'axios';
const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ensure the Authorization header always reads the latest token from localStorage
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Remove authorization header when there's no token
      if (config.headers && config.headers.Authorization) delete config.headers.Authorization;
    }
  } catch {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));