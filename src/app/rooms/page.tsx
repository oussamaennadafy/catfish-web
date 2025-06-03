"use client"

import CallFram from "@/features/rooms/components/CallFram";
import Header from "@/features/rooms/components/Header";
import TabBar from "@/features/rooms/components/TabBar";
import { useHome } from "@/features/rooms/hooks/useHome";

export default function Home() {
  const {
    state: {
      selectedRoomType,
      setSelectedRoomType,
      userState,
      videoStreamsList,
      isCameraOpen,
      isMicOpen,
    },
    functions: {
      handleEndLive,
      handleJoinNextRoom,
      handleToggleCamera,
      handleToggleMic,
    }
  } = useHome();
  return (
    <div className={`flex flex-col w-full h-full min-h-full p-2 gap-2 md:p-4 md:gap-4`}>
      <Header />
      <CallFram
        videoStreamsList={videoStreamsList}
        selectedRoomType={selectedRoomType}
        userState={userState}
        isMicOpen={isMicOpen}
      />
      <TabBar
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
        handleJoinNextRoom={handleJoinNextRoom}
        userState={userState}
        handleEndLive={handleEndLive}
        handleToggleCamera={handleToggleCamera}
        handleToggleMic={handleToggleMic}
        isCameraOpen={isCameraOpen}
        isMicOpen={isMicOpen}
      />
    </div>
  );
}
