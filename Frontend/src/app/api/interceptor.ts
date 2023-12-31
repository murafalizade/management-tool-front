import { BASE_API_URL } from "../constants/baseUrl";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookie from "../utility/Cookie";
import Toastify from "../utility/Toastify";

// Configure request params
const config: AxiosRequestConfig<any> = {
  baseURL: BASE_API_URL,
  timeout: 30000,
};
const service: AxiosInstance = axios.create(config);

// Intercept request
service.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers ?? {};
    const accessToken = Cookie.getCookie(
      process.env.REACT_APP_SECRET_TOKEN_KEY!
    );

    // Check the access token
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    Promise.reject(error);
  }
);

// Intercept response
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // if status code is 500 show error message
    if (response.status === 500) {
      const toast = new Toastify();
      toast.error("Internal server error");
      return;
    }
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default service;
