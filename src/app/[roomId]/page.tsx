"use client"
import Video from "@/common/components/Video";
import { useParams } from "next/navigation";
import Peer, { MediaConnection } from "peerjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";

type VideoStream = {
  userId: string,
  stream: MediaStream;
  isMuted?: boolean;
}

export default function Home() {
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
    const socket = io(process.env.SOCKET_URI);
    const myPeer = new Peer(userId, {
      host: process.env.PEERJS_HOST,
      port: Number(process.env.PEERJS_PORT),
    })
    console.log(myPeer.options);
    
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

  return (
    <div className="flex-col">
      <p>room</p>
      {
        videoStreamsList.map((videoStream, index) => {
          return (
            <div key={index}>
              <Video
                srcObject={videoStream.stream}
                muted={videoStream.isMuted}
                autoPlay
                className="w-[300px]"
              />
              <p>this user has id of {videoStream.userId}</p>
            </div>)
        })
      }
      <div className="space-x-4">
        <button className="bg-slate-600" onClick={() => { console.log(userId); }}>log my user id</button>
        <button className="bg-slate-900" onClick={() => { console.log(roomId); }}>log my room Id</button>
        <button className="bg-slate-900" onClick={() => { console.log(peers); }}>log my peers</button>
        <button className="bg-slate-900" onClick={() => { console.log(videoStreamsList); }}>log my videoStreamsList</button>
      </div>
    </div>
  );
}
