import axios from "axios";

const api = axios.create({
  baseURL: "https://feeding-hands-m10a.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
