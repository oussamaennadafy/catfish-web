import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import { socket } from "@/services/socket";
import { createPeer } from "@/services/peer";
import { v4 } from "uuid";
import { useHomeHelpers } from "./useHomeHelpers";
import { CallFramContentType, userStateType } from "../types";
import { MediaConnection } from "peerjs";

type useInitParams = {
  setVideoStreamsList: Dispatch<SetStateAction<CallFramContentType[]>>,
  setUserState: Dispatch<SetStateAction<userStateType>>,
}

export const useInit = ({ setVideoStreamsList, setUserState }: useInitParams) => {
  const userId = useRef(v4()).current;
  const { addCallFram, connectToNewUser, removeCallFram, updateCallFram } = useHomeHelpers({ setVideoStreamsList, setUserState });
  const peers: Record<string, MediaConnection> = useMemo(() => ({}), []);
  const isReady = useRef({
    isPeerOpen: false,
    isUserReady: false
  }).current;

  useEffect(() => {
    const myPeer = createPeer(userId);

    // request user media (audio and video)
    navigator.mediaDevices?.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // add video preview of the current user stream
      updateCallFram(0, { stream, isMuted: true, userId: userId });

      // set up listener if a new user call the current user
      myPeer.on('call', call => {
        // answer right away to the new user so he can enter
        call.answer(stream);
        // listen to the new user stream to show it to the current user
        call.once('stream', userVideoStream => {
          // add video of the new user
          updateCallFram(1, { stream: userVideoStream, userId: call.peer, isMuted: false });
          setUserState("inCall");
        })

        call.on("close", () => {
          updateCallFram(1, "loader");
          setUserState("waiting");
        })

        peers[call.peer] = call;
      })

      // listenner on future connected users
      socket.on('user-connected', userId => {
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
  }, [peers, addCallFram, removeCallFram, connectToNewUser, userId, isReady, updateCallFram, setUserState]);

  return {
    userId,
    isReady,
    peers,
    updateCallFram,
  }
}