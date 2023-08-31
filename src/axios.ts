import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./utils/constants";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

// при любом запросе проверять токен
instance.interceptors.request.use((config) => {
  //@ts-ignore
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

export default instance;
