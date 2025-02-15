"use client"
import CallFram from "@/features/callHub/components/CallFram";
import Header from "@/features/callHub/components/Header";
import TabBar from "@/features/callHub/components/TabBar";
import { useHome } from "@/features/callHub/hooks/useHome";

export default function Home() {
  const {
    selectedRoomType,
    setSelectedRoomType,
    videoStreamsList,
    handleJoinNextRoom,
    userState,
  } = useHome();
  return (
    <div className="flex flex-col h-full w-full p-4 gap-6">
      <Header />
      <CallFram
        videoStreamsList={videoStreamsList}
        selectedRoomType={selectedRoomType}
      />
      <TabBar 
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
        handleJoinNextRoom={handleJoinNextRoom}
        userState={userState}
      />
    </div>
  );
}
