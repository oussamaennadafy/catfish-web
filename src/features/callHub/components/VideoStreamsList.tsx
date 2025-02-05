import Video from "@/common/components/Video";
import React from "react";
import { useCallHub } from "../hooks/useCallHub";

function VideoStreamsList() {
  const { videoStreamsList } = useCallHub();

  return videoStreamsList.map((videoStream, index) => {
    return (
      <div key={index}>
        <Video
          srcObject={videoStream.stream}
          muted={videoStream.isMuted}
          autoPlay
          className="w-[300px]"
        />
        <p>this user has id of {videoStream.userId}</p>
      </div>
    );
  });
}

export default VideoStreamsList;
