import { axiosInstance } from "./config";

class NetworkUtilsClass {
	/**
	 * This function will make a GET request to the given URL.
	 * @param url The URL to make the request to.
	 * @param params Optional query parameters.
	 * @returns The response from the server.
	 */
	public get(url: string, params?: Record<string, unknown>) {
		return axiosInstance.get(url, { params });
	}

	/**
	 * This function will make a POST request to the given URL.
	 * @param url The URL to make the request to.
	 * @param data Optional data to send in the request.
	 * @param headers Optional headers to include in the request.
	 * @returns The response from the server.
	 */
	public post<T>(
		url: string,
		data?: T,
		headers?: Record<string, unknown>,
	) {
		return axiosInstance.post(url, data, headers);
	}

	/**
	 * This function will make a PUT request to the given URL.
	 * @param url The URL to make the request to.
	 * @param data Optional data to send in the request.
	 * @returns The response from the server.
	 */
	public put(url: string, data?: Record<string, unknown>) {
		return axiosInstance.put(url, data);
	}

	/**
	 * This function will make a PATCH request to the given URL.
	 * @param url The URL to make the request to.
	 * @param data The data to send in the request.
	 * @param headers Optional headers to include in the request.
	 * @returns The response from the server.
	 */
	public patch(
		url: string,
		data: Record<string, unknown>,
		headers?: Record<string, unknown>,
	) {
		return axiosInstance.patch(url, data, headers);
	}

	/**
	 * This function will make a DELETE request to the given URL.
	 * @param url The URL to make the request to.
	 * @param data Optional data to send in the request.
	 * @returns The response from the server.
	 */
	public delete(url: string, data?: Record<string, unknown>) {
		return axiosInstance.delete(url, { data });
	}

	/**
	 * This function will add a dynamic header and value to the axios instance.
	 * @param header The header name.
	 * @param value The header value.
	 */
	public addHeader(header: string, value: string) {
		axiosInstance.defaults.headers.common[header] = value;
	}
}

const NetworkUtils = new NetworkUtilsClass();

export default NetworkUtils;
