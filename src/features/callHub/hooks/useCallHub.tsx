import { useParams } from "next/navigation";
import Peer, { MediaConnection } from "peerjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import { VideoStream } from "../types";

export const useCallHub = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [videoStreamsList, setVideoStreamsList] = useState<VideoStream[]>([]);
  const userIdRef = useRef(v4());
  const userId = userIdRef.current;

  const peers: Record<string, MediaConnection> = useMemo(() => ({}), []);

  const addVideoStream = useCallback(({ stream, isMuted, userId }: VideoStream) => {
    setVideoStreamsList((prev) => ([
      ...prev,
      {
        isMuted: isMuted || false,
        stream: stream,
        userId: userId
      },
    ]));
  }, []);

  const removeVideoStream = useCallback((userId: VideoStream["userId"]) => {
    setVideoStreamsList((prev) => {
      return prev.filter((video: VideoStream) => video.userId !== userId);
    })
  }, []);

  const connectToNewUser = useCallback((userId: string, stream: MediaStream, peer: Peer) => {
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
  }, [addVideoStream, removeVideoStream, peers]);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    const myPeer = new Peer(userId, {
      host: "/",
      port: 3001,
    })

    // request user media (audio and video)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // add video preview of the current user stream
      addVideoStream({ stream, isMuted: true, userId: userId });

      // set up listener if a new user call the current user
      myPeer.on('call', call => {
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
      // user is ready to recieve calls in room
      socket.emit("ready");

      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream, myPeer);
      })

    })
    socket.on('user-disconnected', userId => {
      // clean up to make sure that the user connection is closed
      if (peers[userId]) {
        peers[userId].close();
        delete peers[userId];
      }
    })

    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id)
    })
  }, [peers, roomId, userId, addVideoStream, removeVideoStream, connectToNewUser]);

  return {
    videoStreamsList,
  }
}