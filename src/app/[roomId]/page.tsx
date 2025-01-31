"use client"
import Video from "@/common/components/Video";
import { useParams } from "next/navigation";
import Peer, { MediaConnection } from "peerjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";

type VideoStream = {
  stream: MediaStream;
  isMuted?: boolean;
}

export default function Home() {
  const { roomId } = useParams<{ roomId: string }>();
  const [videoStreamsList, setVideoStreamsList] = useState<VideoStream[]>([]);
  const userIdRef = useRef(v4());

  const peers: Record<string, MediaConnection> = useMemo(() => ({}), []);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    const userId = userIdRef.current;
    const myPeer = new Peer(userId, {
      host: '/',
      port: 3001
    })

    // request user media (audio and video)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // add video preview of the current user stream
      addVideoStream({ stream, isMuted: true });

      myPeer.on('call', call => {
        call.answer(stream)
        call.on('stream', userVideoStream => {
          addVideoStream({ stream: userVideoStream })
        })
      })

      socket.on('user-connected', userId => {
        console.log("user-connected with id of :" + userId);
        connectToNewUser(userId, stream, myPeer);
      })
    })
    
    socket.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close()
    })

    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id)
    })
  }, []);

  const addVideoStream = ({ stream, isMuted }: VideoStream) => {
    console.log("addVideoStream");
    setVideoStreamsList((prev) => ([
      ...prev,
      {
        isMuted: isMuted || false,
        stream: stream,
      },
    ]));
  };

  function connectToNewUser(userId: string, stream: MediaStream, peer: Peer) {
    const call = peer.call(userId, stream);
    call.on('stream', userVideoStream => {
      addVideoStream({ stream: userVideoStream });
    })
    call.on('close', () => {
    })

    peers[userId] = call
  }

  return (
    <div className="flex-row">
      <p>room</p>
      {
        videoStreamsList.map((videoStream, index) => {
          return <Video
            key={index}
            srcObject={videoStream.stream}
            muted={videoStream.isMuted}
            autoPlay
            className="w-[300px]"
          />
        })
      }
      <div className="space-x-4">
        <button className="bg-slate-600" onClick={() => { console.log(userIdRef.current); }}>log my user id</button>
        <button className="bg-slate-900" onClick={() => { console.log(roomId); }}>log my room Id</button>
      </div>
    </div>
  );
}
