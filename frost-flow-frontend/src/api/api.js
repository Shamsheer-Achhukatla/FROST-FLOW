import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // <- your backend server
});

// =======================
// REQUEST INTERCEPTOR
// =======================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      alert("⚠️ Network error. Check your internet.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }

    if (status === 403) {
      alert("You don't have permission to perform this action.");
    }

    if (status === 500) {
      alert("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default API;