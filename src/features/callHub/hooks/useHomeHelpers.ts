import { Dispatch, SetStateAction, useCallback } from "react";
import { VideoStream } from "../types";
import Peer, { MediaConnection } from "peerjs";

export const useHomeHelpers = (setVideoStreamsList: Dispatch<SetStateAction<VideoStream[]>>) => {
  const addVideoStream = useCallback(({ stream, isMuted, userId }: VideoStream) => {
    setVideoStreamsList((prev) => ([
      ...prev,
      {
        isMuted: isMuted || false,
        stream: stream,
        userId: userId
      },
    ]));
  }, [setVideoStreamsList]);

  const removeVideoStream = useCallback((userId: VideoStream["userId"]) => {
    setVideoStreamsList((prev) => {
      return prev.filter((video: VideoStream) => video.userId !== userId);
    })
  }, [setVideoStreamsList]);

  const connectToNewUser = useCallback((userId: string, stream: MediaStream, peer: Peer, peers: Record<string, MediaConnection>) => {
    // call the new entered user and pass current user stream
    const call = peer.call(userId, stream);

    // listen to the new user stream to show it to the current user
    call.once('stream', userVideoStream => {
      addVideoStream({ stream: userVideoStream, userId });
    })
    call.on('close', () => {
      // remove user from peers
      removeVideoStream(userId);
    })

    // register the call in our dictionary
    peers[call.peer] = call;
  }, [addVideoStream, removeVideoStream]);

  return {
    addVideoStream,
    removeVideoStream,
    connectToNewUser,
  }
}