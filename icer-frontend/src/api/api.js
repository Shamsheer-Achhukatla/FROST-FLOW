import axios from "axios";

const API = axios.create({
  baseURL: "https://frost-flow-1.onrender.com/api",
});

export default API;