import axios from "axios";
import RequestInterceptor from "./requestInterceptor"

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL,
});

const requestInterceptor = new RequestInterceptor(axiosInstance);

export { axiosInstance, requestInterceptor };