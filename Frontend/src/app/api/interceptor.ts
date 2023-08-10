import { BASE_API_URL } from "../constants/baseUrl";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookie from "../utility/Cookie";

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
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default service;
