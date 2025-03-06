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
    handleAppFriend,
    handleEndLive
  } = useHome();
  return (
    <div className={`flex flex-col w-full h-full min-h-full p-2 gap-2 md:p-4 md:gap-4`}>
      <Header handleAppFriend={handleAppFriend} />
      <CallFram
        videoStreamsList={videoStreamsList}
        selectedRoomType={selectedRoomType}
        userState={userState}
      />
      <TabBar
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
        handleJoinNextRoom={handleJoinNextRoom}
        userState={userState}
        handleEndLive={handleEndLive}
      />
    </div>
  );
}
