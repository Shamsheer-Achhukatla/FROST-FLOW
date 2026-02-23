import axios from "axios";

<<<<<<< HEAD
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
=======
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

>>>>>>> 3917b19f969e3e2905b257cd2b7d8ae0594c68f4
    return config;
  },
  (error) => Promise.reject(error)
);

<<<<<<< HEAD
// =======================
// RESPONSE INTERCEPTOR
// =======================
API.interceptors.response.use(
  (response) => response,
=======

/*
====================================================
  RESPONSE INTERCEPTOR
====================================================
Handles global errors & auto logout if token expired.
*/
API.interceptors.response.use(
  (response) => response,

>>>>>>> 3917b19f969e3e2905b257cd2b7d8ae0594c68f4
  (error) => {
    if (!error.response) {
      alert("⚠️ Network error. Check your internet.");
      return Promise.reject(error);
    }

    const status = error.response.status;

<<<<<<< HEAD
    if (status === 401) {
      localStorage.removeItem("token");
=======
    // 🔐 Token expired / invalid
    if (status === 401) {
      localStorage.removeItem("token");

>>>>>>> 3917b19f969e3e2905b257cd2b7d8ae0594c68f4
      alert("Session expired. Please login again.");
      window.location.href = "/login";
    }

<<<<<<< HEAD
=======
    // 🚫 Forbidden
>>>>>>> 3917b19f969e3e2905b257cd2b7d8ae0594c68f4
    if (status === 403) {
      alert("You don't have permission to perform this action.");
    }

<<<<<<< HEAD
=======
    // 🔥 Server error
>>>>>>> 3917b19f969e3e2905b257cd2b7d8ae0594c68f4
    if (status === 500) {
      alert("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default API;