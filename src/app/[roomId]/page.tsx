"use client"
import Video from "@/common/components/Video";
import { useCallHub } from "@/features/callHub/hooks/useCallHub";

export default function Home() {
  const { videoStreamsList } = useCallHub();
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
            </div>
          )
        })
      }
    </div>
  );
}
