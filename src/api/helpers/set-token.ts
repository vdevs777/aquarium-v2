import { useAuthStore } from "@/stores/auth-store";
import { AxiosInstance } from "axios";

export function setToken(api: AxiosInstance) {
  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}
