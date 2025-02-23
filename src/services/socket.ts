import { io } from "socket.io-client";

export const socket = io(process.env.NODE_ENV === "production" ? process.env.PROD_SOCKET_URL : process.env.DEV_SOCKET_URL);