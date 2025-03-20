import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

class RequestInterceptor {
	private axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
		this.apply();
	}

	/**
	 * Applies request interceptor.
	 */
	private apply() {
		this.axiosInstance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// console.log("request", process.env.NODE_ENV, config.baseURL ,config.url);
				return config;
			},
		);
	}
}

export default RequestInterceptor;
