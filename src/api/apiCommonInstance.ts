import axios from "axios";
import Cookies from "js-cookie";

const apiCommonInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiCommonInstance.interceptors.request.use(
  (config) => {
    if (
      !config.url?.includes("auth/user") ||
      !config.url?.includes("auth/owner")
    ) {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiCommonInstance;
