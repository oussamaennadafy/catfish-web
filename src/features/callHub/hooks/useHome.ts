import { MediaConnection } from "peerjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";
import { RoomTypeEnum, VideoStream } from "../types";
import { socket } from "@/services/socket";
import { createPeer } from "@/services/peer";
import { useHomeHelpers } from "./useHomeHelpers";

export const useHome = () => {
  const [selectedRoomType, setSelectedRoomType] = useState(RoomTypeEnum.twoUsers);
  const [videoStreamsList, setVideoStreamsList] = useState<VideoStream[]>([]);
  const userId = useRef(v4()).current;
  const { addVideoStream, connectToNewUser, removeVideoStream } = useHomeHelpers(setVideoStreamsList);
  const peers: Record<string, MediaConnection> = useMemo(() => ({}), []);
  const isReady = useRef({
    isPeerOpen: false,
    isUserReady: false
  }).current;
  const [isMatchingStarted, setIsMatchingStarted] = useState(false);

  useEffect(() => {
    const myPeer = createPeer(userId);

    // request user media (audio and video)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // add video preview of the current user stream
      addVideoStream({ stream, isMuted: true, userId: userId });

      // set up listener if a new user call the current user
      myPeer.on('call', call => {
        console.log("receive call on init...");
        // answer right away to the new user so he can enter
        call.answer(stream);
        // listen to the new user stream to show it to the current user
        call.once('stream', userVideoStream => {
          // add video of the new user
          addVideoStream({ stream: userVideoStream, userId: call.peer });
        })

        call.on("close", () => {
          removeVideoStream(call.peer);
        })

        peers[call.peer] = call;
      })

      // listenner on future connected users 
      socket.on('user-connected', userId => {
        console.log("user-connected, please call him...");
        connectToNewUser(userId, stream, myPeer, peers);
      })

      isReady.isUserReady = true;
    })

    // listen on disconnected users
    socket.on('user-disconnected', userId => {
      // clean up to make sure that the user connection is closed
      if (peers[userId]) {
        peers[userId].close();
        delete peers[userId];
      }
    })

    myPeer.on('open', () => {
      isReady.isPeerOpen = true;
    })
  }, [peers, addVideoStream, removeVideoStream, connectToNewUser, userId, isReady]);

  const joinRoom = () => {
    if (isReady.isPeerOpen && isReady.isUserReady) {
      socket.emit('join-room', userId, RoomTypeEnum[selectedRoomType]);
    }
  }

  return {
    videoStreamsList,
    selectedRoomType,
    setSelectedRoomType,
    joinRoom,
    isMatchingStarted,
  }
}