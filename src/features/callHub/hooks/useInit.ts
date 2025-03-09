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
  videoStreamsList: CallFramContentType[],
  isCameraOpen: boolean,
}

export const useInit = ({ setVideoStreamsList, setUserState }: useInitParams) => {
  const userId = useRef(v4()).current;
  const { addCallFram, connectToNewUser, removeCallFram, updateCallFram, makeCallFramAudioOnly } = useHomeHelpers({ setVideoStreamsList, setUserState });
  const peers: Record<string, MediaConnection> = useMemo(() => ({}), []);
  const isReady = useRef({
    isPeerOpen: false,
    isUserReady: false
  }).current;

  const userStreamRef = useRef<MediaStream>(null);

  useEffect(() => {
    const myPeer = createPeer(userId);

    // request user media (audio and video)
    navigator.mediaDevices?.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // save users stream
      userStreamRef.current = stream;

      // add video preview of the current user stream
      updateCallFram(0, { stream, isMuted: true, userId: userId });

      // set up listener if a new user call the current user
      myPeer.on('call', call => {
        // answer right away to the new user so he can enter
        call.answer(stream);
        // listen to the new user stream to show it to the current user
        call.once('stream', userVideoStream => {
          const isCameraOpen = call.metadata?.isCameraOpen;
          // add video of the new user
          updateCallFram(1, { stream: userVideoStream, userId: call.peer, isMuted: false, isCameraOff: !isCameraOpen });
          setUserState("inCall");
        })

        call.on("close", () => {
          updateCallFram(1, "loader");
          setUserState("waiting");
        })

        peers[call.peer] = call;
      })

      // listenner on future connected users
      socket.on('user-connected', (userId, isCameraOpen) => {
        connectToNewUser(userId, stream, myPeer, peers, isCameraOpen);
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

  useEffect(() => {
    // listenner on future connected users
    const listenner = () => {
      makeCallFramAudioOnly(1);
    };

    socket.on('toggle-camera', listenner);
    return () => {
      socket.off('toggle-camera', listenner);
    }
  }, [peers, updateCallFram, setVideoStreamsList, makeCallFramAudioOnly]);

  return {
    userId,
    isReady,
    peers,
    updateCallFram,
    userStreamRef,
  }
}