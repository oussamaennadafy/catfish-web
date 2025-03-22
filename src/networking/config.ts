import axios from "axios";
import RequestInterceptor from "./requestInterceptor"

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

const requestInterceptor = new RequestInterceptor(axiosInstance);

export { axiosInstance, requestInterceptor };