/**
 * @file SocketUtils.ts
 * @description Socket service to handle socket connection and events
 */

import { Socket, io } from "socket.io-client";

class SocketUtils {
	private socket: Socket;

	constructor() {
		this.socket = io(process.env.SOCKET_URL, {
			autoConnect: false,
			transports: ["websocket"],
		});

		this.socket.connect();
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
