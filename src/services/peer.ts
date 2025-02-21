import Peer from "peerjs";

export const createPeer = (userId: string) => new Peer(userId, {
  host: "0.peerjs.com",
  port: 443,
  secure: true,
});