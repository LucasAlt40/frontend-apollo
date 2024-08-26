import axios from "axios";
import { getAccessToken } from "../../utils/jwtUtils";

const apiCommonInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiCommonInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const isAuthRoute =
      config.url?.includes("auth/user") || config.url?.includes("auth/owner");

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiCommonInstance;
