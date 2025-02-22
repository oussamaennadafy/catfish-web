"use client"
import CallFram from "@/features/callHub/components/CallFram";
import Header from "@/features/callHub/components/Header";
import TabBar from "@/features/callHub/components/TabBar";
import { useHome } from "@/features/callHub/hooks/useHome";
import { DeviceUtility } from "@/utils/device_utility";

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
    <div className={`flex flex-col w-full h-full ${DeviceUtility.isMobile() ? "p-1 gap-1" : "p-4 gap-4"}`}>
      <Header handleAppFriend={handleAppFriend} />
      <CallFram
        videoStreamsList={videoStreamsList}
        selectedRoomType={selectedRoomType}
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
