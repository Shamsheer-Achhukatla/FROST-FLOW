import axios from "axios";

/*
====================================================
  AXIOS INSTANCE
====================================================
Creates a reusable HTTP client for your backend.
All requests will use this base URL.
*/
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000, // prevents hanging requests
});


/*
====================================================
  REQUEST INTERCEPTOR
====================================================
Automatically attaches JWT token before every request.
*/
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


/*
====================================================
  RESPONSE INTERCEPTOR
====================================================
Handles global errors & auto logout if token expired.
*/
API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      alert("⚠️ Network error. Check your internet.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    // 🔐 Token expired / invalid
    if (status === 401) {
      localStorage.removeItem("token");

      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }

    // 🚫 Forbidden
    if (status === 403) {
      alert("You don't have permission to perform this action.");
    }

    // 🔥 Server error
    if (status === 500) {
      alert("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default API;