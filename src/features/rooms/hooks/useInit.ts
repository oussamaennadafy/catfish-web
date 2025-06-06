import { Dispatch, RefObject, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useHomeHelpers } from "./useHomeHelpers";
import { CallFramContentType, userStateType } from "../types";
import Peer, { MediaConnection } from "peerjs";
import { RoomEvents } from "../constants/events";
import socketUtils from "@/networking/socketUtils";
import { v4 as uuidv4 } from 'uuid';

type useInitParams = {
  setVideoStreamsList: Dispatch<SetStateAction<CallFramContentType[]>>,
  setUserState: Dispatch<SetStateAction<userStateType>>,
  videoStreamsList: CallFramContentType[],
  isCameraOpen: boolean,
  isCameraOpenRef: RefObject<boolean>,
  userState: userStateType,
}

export const useInit = ({ setVideoStreamsList, setUserState, isCameraOpen, isCameraOpenRef, userState }: useInitParams) => {
  const currentUserId = useRef(uuidv4()).current;
  const { connectToNewUser, updateCallFram, toggleCallFramCamera } = useHomeHelpers({ setVideoStreamsList, setUserState, isCameraOpen, isCameraOpenRef, currentUserId });
  const peers: Record<string, MediaConnection> = useMemo(() => ({}), []);
  const [isReady, setIsReady] = useState({
    isPeerOpen: false,
    isUserReady: false
  });
  const myPeerRef = useRef<Peer>(null);

  const userStreamRef = useRef<MediaStream>(null);

  useEffect(() => {
    const myPeer = new Peer(currentUserId, {
      host: "0.peerjs.com",
      port: 443,
      secure: true,
    });
    myPeerRef.current = myPeer;
    console.log({ "BASE_URL": process.env.BASE_URL });

    // request user media (audio and video)
    navigator.mediaDevices?.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // save users stream
      userStreamRef.current = stream;

      // add video preview of the current user stream
      updateCallFram(0, { stream, isMuted: true, userId: currentUserId, isCameraOpen: true });

      // set up listener if a new user call the current user
      myPeer.on('call', call => {
        // answer right away to the new user so he can enter
        call.answer(stream);
        // listen to the new user stream to show it to the current user
        call.once('stream', userVideoStream => {
          if (isCameraOpenRef.current === false) {
            socketUtils.getSocket().emit("toggle-camera", isCameraOpenRef.current)
          }
          updateCallFram(1, { stream: userVideoStream, userId: call.peer, isMuted: false, isCameraOpen: call.metadata.current });
          setUserState("inCall");
        })

        call.on("close", () => {
          updateCallFram(1, "loader");
          setUserState("waiting");
        })

        peers[call.peer] = call;
      })

      // listenner on future connected users
      socketUtils.getSocket().on(RoomEvents.server.USER_JOINED, (userId) => {
        connectToNewUser(userId.toString(), stream, myPeer, peers);
      })

      setIsReady(prev => ({
        ...prev,
        isUserReady: true,
      }));
    })

    // listen on disconnected users
    socketUtils.getSocket().on(RoomEvents.server.USER_DISCONNECTED, (userId) => {
      // clean up to make sure that the user connection is closed
      if (peers[userId]) {
        peers[userId].close();
        delete peers[userId];
      }
    })
    // listen on disconnected users
    socketUtils.getSocket().on('toggle-camera', () => {
      setTimeout(() => {
        toggleCallFramCamera(1);
      }, 100);
    })

    myPeer.on('open', () => {
      setIsReady(prev => ({
        ...prev,
        isPeerOpen: true,
      }));
    })
  }, []);
  
  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if(userState == "waiting") {
      timeoutID = setTimeout(() => {
        socketUtils.getSocket().emit(RoomEvents.client.LEAVE_ROOM, currentUserId);
        // join room after complete leaving process
        socketUtils.getSocket().once(RoomEvents.server.READY_TO_JOIN, () => {
          socketUtils.getSocket().emit(RoomEvents.client.JOIN_ROOM, currentUserId);
        })
      }, 5000);
    }
    
    return () => {
      if(userState == "waiting" && timeoutID) {
        clearTimeout(timeoutID);
      }
    }
  }, [userState, currentUserId]);

  return {
    userId: currentUserId,
    isReady,
    peers,
    updateCallFram,
    userStreamRef,
    toggleCallFramCamera,
    myPeerRef,
  }
}