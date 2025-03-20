/**
 * @file SocketUtils.ts
 * @description Socket service to handle socket connection and events
 */

import { store } from "@/store";
import { Socket, io } from "socket.io-client";

class SocketUtils {
	private socket: Socket;

	constructor() {
		this.socket = io(process.env.NODE_ENV === "production" ? process.env.PROD_SOCKET_URL : process.env.DEV_SOCKET_URL, {
			autoConnect: false,
			transports: ["websocket"],
		});

    const token = store.getState().authentication.token;
    if(token) {
      this.setAuthorizationToken(token);
    }
	}

	/**
	 * set the socket auth token
	 * @param token
	 */
	public setAuthorizationToken(token: string) {
		const Authorization = `Bearer ${token}`;
		this.socket.auth = { token: Authorization };
		this.socket.connect();
	}
	/**
	 * set the socket device token in headers
	 */
	public setDeviceToken(deviceToken: string) {
		this.socket.io.opts.extraHeaders = {
			"device-id": deviceToken,
		};
	}

	/**
	 * disconnect the socket
	 */
	public disconnect() {
		this.socket.disconnect();
	}

	/**
	 * emit an event to the socket
	 */
	public emit(event: string, data: Record<string, unknown>) {
		this.socket.emit(event, data);
	}

	/**
	 * listen to an event from the socket
	 */
	public on(event: string, callback: (...args: unknown[]) => void) {
		this.socket.on(event, callback);
	}

	/**
	 * once listen to an event from the socket
	 */
	public once(event: string, callback: (...args: unknown[]) => void) {
		this.socket.once(event, callback);
	}

	/**
	 * remove the listener from the socket
	 */
	public off(event: string, listener: (...args: unknown[]) => void) {
		this.socket.off(event, listener);
	}

	/**
	 * remove all listeners from the socket
	 */
	public removeAllListeners(event: string) {
		this.socket.removeAllListeners(event);
	}

	/**
	 * remove all listeners from the socket
	 */
	public getSocket(): Socket {
		return this.socket;
	}

}

const socketUtils = new SocketUtils();

export default socketUtils;
