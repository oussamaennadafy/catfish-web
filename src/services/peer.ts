import Peer from "peerjs";

export const createPeer = (userId: string) => new Peer(userId, {
  host: "/",
  port: 3001,
});