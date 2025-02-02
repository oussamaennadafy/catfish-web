"use client"
import Video from "@/common/components/Video";
import { useParams } from "next/navigation";
import Peer, { MediaConnection } from "peerjs";
import { useEffect, useMemo, useRef, useState } from "react";
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

  useEffect(() => {
    const socket = io('http://localhost:3000');
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
      addVideoStream({ stream, isMuted: true, userId: userId });

      // console.log("user own stream", stream);

      // set up listener if a new user call the current user
      myPeer.on('call', call => {
        // console.log("someone calling..........");
        // answer right away to the new user so he can enter
        call.answer(stream);
        // listen to the new user stream to show it to the current user
        call.once('stream', userVideoStream => {
          // console.log("on stream in on call getUserMedia...", userVideoStream);
          // add video of the new user
          addVideoStream({ stream: userVideoStream, userId: call.peer });
        })

        call.on("close", () => {
          // console.log("call.on('close') close call with userId :", userId);
          removeVideoStream(call.peer);
        })

        peers[userId] = call;
      })
      // user is ready to recieve calls in room
      socket.emit("ready");

      socket.on('user-connected', userId => {
        // console.log(`user connected with id -> ${userId}`, { peers });
        connectToNewUser(userId, stream, myPeer);
      })

    })
    socket.on('user-disconnected', userId => {
      // console.log("socket.on('user-disconnected') close call with userId :", userId);
      // console.log(`user -> ${userId} disconnected`, { peers });
      // close the call if a user leaves the room
      if (peers[userId]) {
        // console.log("we found peers[userId] and were about to close the call");
        peers[userId].close();
        //remove the peer id from peers
        delete peers[userId];
      }
    })

    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id)
    })

    const connectToNewUser = (userId: string, stream: MediaStream, peer: Peer) => {
      // call the new entered user and pass current user stream
      // console.log("call the other user with id of : " + userId);
      const call = peer.call(userId, stream);

      // listen to the new user stream to show it to the current user
      call.once('stream', userVideoStream => {
        // console.log("on stream in connectToNewUser...", userVideoStream);
        addVideoStream({ stream: userVideoStream, userId });
      })
      call.on('close', () => {
        // remove user from peers
        // console.log("call.on('close') close call with userId :", userId);
        removeVideoStream(userId);
      })

      // register the call in our dictionary
      peers[userId] = call;
    };
  }, []);

  const addVideoStream = ({ stream, isMuted, userId }: VideoStream) => {
    setVideoStreamsList((prev) => ([
      ...prev,
      {
        isMuted: isMuted || false,
        stream: stream,
        userId: userId
      },
    ]));
    // console.log(videoStreamsList.length);
  };

  const removeVideoStream = (userId : VideoStream["userId"]) => {
    // const filteredList = videoStreamsList.filter((video: VideoStream) => video.userId == userId);
    setVideoStreamsList((prev) => {
      return prev.filter((video: VideoStream) => video.userId !== userId);
    })
    // setVideoStreamsList(filteredList);
  };

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
