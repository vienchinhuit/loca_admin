import axios, { AxiosError, AxiosInstance } from "axios";
import { AuthResponse, RefreshTokenReponse } from "../../modules/Auth/type";
import {
  clearCookie,
  clearLS,
  getTokenFromCookie,
  setTokenToCookie,
} from "./auth";
import { toast } from "react-toastify";

class Http {
  // public accessToken: string;
  instance: AxiosInstance;
  private refreshToken: string;
  constructor() {
    // this.accessToken = getTokenFromCookie("access_token");
    this.refreshToken = getTokenFromCookie("refresh_token");
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_URL_API,
      timeout: 0,
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    this.instance.interceptors.request.use(
      async (config) => {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${getTokenFromCookie(
            "access_token"
          )}`;
          return config;
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/auth/change-password") {
          clearCookie("access_token");
          clearCookie("refresh_token");
        }
        return response;
      },
      (error: AxiosError) => {
        try {
          if (error.response?.status === 401 && this.refreshToken) {
            try {
              this.handleRefreshToken();
            } catch (error) {
              clearLS();
              // this.accessToken = "";
              this.refreshToken = "";
              throw error;
            }
          } else if (error.response?.status === 423) {
            console.log(123);

            (window.location as any).href = "/login";
            clearCookie("access_token");
            clearCookie("refresh_token");
          } 
          // else {
          //   (window.location as any).href = "/server-error";
          // }
        } catch (error) {
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  private async handleRefreshToken() {
    return await this.instance
      .post<RefreshTokenReponse>("auth/refresh-token", {
        refreshToken: this.refreshToken,
      })
      .then((res) => {
        const { accessToken } = res.data.data;
        setTokenToCookie("access_token", accessToken, 1);
        // this.accessToken = accessToken;
        return accessToken;
      })
      .catch((error) => {
        toast.error("Hết phiên đăng nhập! Vui lòng đăng nhập lại!");
        (window.location as any).href = "/login";
        clearCookie("access_token");
        clearCookie("refresh_token");
        this.refreshToken = "";
        throw error;
      });
  }
}

const http = new Http().instance;
export default http;

class Http2 {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_URL_API,
      timeout: 10000,
      headers: {
        "Content-type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      async (response) => {
        const { url } = response.config;
        if (url === "/auth/login") {
          const data = response.data as AuthResponse;
          const accessToken = data.data?.accessToken;
          const refreshToken = data.data?.refreshToken;
          if (accessToken && refreshToken) {
            setTokenToCookie("access_token", accessToken, 30);
            setTokenToCookie("refresh_token", refreshToken, 7);
          }
        } else if (url === "/auth/logout") {
          clearCookie("access_token");
          clearCookie("refresh_token");
        }
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}

const http2 = new Http2().instance;
export { http2 };
