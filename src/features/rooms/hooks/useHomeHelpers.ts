import { Dispatch, SetStateAction, useCallback } from "react";
import { CallFramContentType, userStateType, VideoStream } from "../types";
import Peer, { MediaConnection } from "peerjs";

type useHomeHelpersParams = {
  setVideoStreamsList: Dispatch<SetStateAction<CallFramContentType[]>>,
  setUserState: Dispatch<SetStateAction<userStateType>>,
  currentUserId: string,
  isCameraOpen: boolean,
  isMicOpen: boolean,
}

export const useHomeHelpers = ({ setVideoStreamsList, setUserState, currentUserId }: useHomeHelpersParams) => {
  const addCallFram = useCallback(({ stream, isMuted, userId }: VideoStream) => {
    setVideoStreamsList((prev) => ([
      ...prev,
      {
        id: prev.length + 1,
        content: {
          isMuted: isMuted || false,
          stream: stream,
          userId: userId,
        },
      },
    ]));
  }, [setVideoStreamsList]);

  const removeCallFram = useCallback((userId: VideoStream["userId"]) => {
    setVideoStreamsList((prev) => {
      return prev.filter((callFram: CallFramContentType) => (callFram.content as VideoStream)["userId"] !== userId);
    })
  }, [setVideoStreamsList]);

  const updateCallFram = useCallback((id: CallFramContentType["id"], callFramContent: CallFramContentType["content"]) => {
    setVideoStreamsList((prev) => {
      return prev.map(item => {
        if (item.id == id) {
          return { id: item.id, content: callFramContent };
        } else {
          return item;
        }
      })
    });
  }, [setVideoStreamsList]);

  const connectToNewUser = (userId: string, stream: MediaStream, peer: Peer, peers: Record<string, MediaConnection>, isCameraOpen: boolean, isMicOpen: boolean) => {
    if (!peer.open) {
      peer.connect(currentUserId);
    }
    // call the new entered user and pass current user stream
    const call = peer.call(userId, stream, {
      metadata: {
        isCameraOpen,
        isMicOpen,
      }
    });

    // listen to the new user stream to show it to the current user
    call.once('stream', (userVideoStream) => {
      updateCallFram(1, { stream: userVideoStream, userId, isMuted: false, isCameraOpen: false });
      setUserState("inCall");
      // emit stream start
    })
    call.on('close', () => {
      // remove user from peers
      updateCallFram(1, "loader");
      setUserState("waiting");
    })

    // register the call in our dictionary
    peers[call.peer] = call;
  };

  return {
    addCallFram,
    removeCallFram,
    connectToNewUser,
    updateCallFram,
  }
}