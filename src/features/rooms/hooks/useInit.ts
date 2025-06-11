import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useHomeHelpers } from "./useHomeHelpers";
import { CallFramContentType, userStateType, VideoStream } from "../types";
import Peer, { MediaConnection } from "peerjs";
import { RoomEvents } from "../constants/events";
import socketUtils from "@/networking/socketUtils";
import { v4 as uuidv4 } from 'uuid';

type useInitParams = {
  setVideoStreamsList: Dispatch<SetStateAction<CallFramContentType[]>>,
  setUserState: Dispatch<SetStateAction<userStateType>>,
  videoStreamsList: CallFramContentType[],
  userState: userStateType,
  isCameraOpen: boolean,
  isMicOpen: boolean,
}

export const useInit = ({ setVideoStreamsList, setUserState, userState, isCameraOpen, isMicOpen }: useInitParams) => {
  const currentUserId = useRef(uuidv4()).current;
  const { connectToNewUser, updateCallFram } = useHomeHelpers({ setVideoStreamsList, setUserState, currentUserId, isCameraOpen, isMicOpen });
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
    // console.log({ "BASE_URL": process.env.BASE_URL });

    // request user media (audio and video)
    navigator.mediaDevices?.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // save users stream
      userStreamRef.current = stream;

      // add video preview of the current user stream
      updateCallFram(0, { stream, isMuted: true, userId: currentUserId, isCameraOpen: true });

      // listenner on future connected users
      socketUtils.getSocket().on(RoomEvents.server.CAMERA_TOGGLED, (userId) => {
        // update streams state
        setVideoStreamsList((prev) => {
          return prev.map((streamContent) => {
            if ((streamContent?.content as VideoStream)?.userId === userId) {
              return {
                ...streamContent,
                content: {
                  ...(streamContent.content as VideoStream),
                  isCameraOpen: !(streamContent.content as VideoStream).isCameraOpen,
                }
              }
            }
            return streamContent;
          })
        });
      });

      socketUtils.getSocket().on(RoomEvents.server.MIC_TOGGLED, (userId) => {
        // update streams state
        setVideoStreamsList((prev) => {
          return prev.map((streamContent) => {
            if ((streamContent?.content as VideoStream)?.userId === userId) {
              return {
                ...streamContent,
                content: {
                  ...(streamContent.content as VideoStream),
                  isMuted: !(streamContent.content as VideoStream).isMuted,
                }
              }
            }
            return streamContent;
          })
        });
      });

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

    myPeer.on('open', () => {
      setIsReady(prev => ({
        ...prev,
        isPeerOpen: true,
      }));
    })
  }, []);

  useEffect(() => {
    const callback = (userId: string) => {
      if (!userStreamRef.current || !myPeerRef.current) return;
      connectToNewUser(userId.toString(), userStreamRef.current, myPeerRef.current, peers, isCameraOpen, isMicOpen);
    };
    // listenner on future connected users
    socketUtils.on(RoomEvents.server.USER_JOINED, callback as () => void);

    return () => {
      socketUtils.off(RoomEvents.server.USER_JOINED, callback as () => void);
    }
  }, [connectToNewUser, isCameraOpen, isMicOpen, peers])

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (!myPeerRef.current) return;
    // set up listener if a new user call the current user
    const callback = (call: MediaConnection) => {
      if (!userStreamRef.current) return;
      // answer right away to the new user so he can enter
      call.answer(userStreamRef.current);
      // listen to the new user stream to show it to the current user
      call.once('stream', (userVideoStream) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        // on stream start toggle camera if needed
        timeoutRef.current = setTimeout(() => {
          if (isCameraOpen) {
            socketUtils.getSocket().emit(RoomEvents.client.TOGGLE_CAMERA, currentUserId, false);
          }
          if (!isMicOpen) {
            socketUtils.getSocket().emit(RoomEvents.client.TOGGLE_MIC, currentUserId, false);
          }
        }, 200);
        updateCallFram(1, { stream: userVideoStream, userId: call.peer, isMuted: !call.metadata.isMicOpen, isCameraOpen: call.metadata.isCameraOpen });
        setUserState("inCall");
      })

      call.on("close", () => {
        updateCallFram(1, "loader");
        setUserState("waiting");
      })

      peers[call.peer] = call;
    }

    myPeerRef.current.on('call', callback);

    return () => {
      myPeerRef.current?.off("call", callback);
    }
  }, [currentUserId, isCameraOpen, isMicOpen, peers, setUserState, updateCallFram]);

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    if (userState == "waiting") {
      timeoutID = setTimeout(() => {
        socketUtils.getSocket().emit(RoomEvents.client.LEAVE_ROOM);
        // join room after complete leaving process
        socketUtils.getSocket().once(RoomEvents.server.READY_TO_JOIN, () => {
          socketUtils.getSocket().emit(RoomEvents.client.JOIN_ROOM, currentUserId);
        })
      }, 5000);
    }

    return () => {
      if (userState == "waiting" && timeoutID) {
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
    myPeerRef,
  }
}