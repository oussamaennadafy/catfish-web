"use client"
import CallFram from "@/features/callHub/components/CallFram";
import Header from "@/features/callHub/components/Header";
import TabBar from "@/features/callHub/components/TabBar";
import { useHome } from "@/features/callHub/hooks/useHome";

export default function Home() {
  const {
    selectedRoomType,
    setSelectedRoomType,
  } = useHome();
  return (
    <div className="flex flex-col gap-4 h-full w-full p-6">
      <Header />
      <CallFram
        selectedRoomType={selectedRoomType}
      />
      <TabBar 
        selectedRoomType={selectedRoomType}
        setSelectedRoomType={setSelectedRoomType}
      />
    </div>
  );
}
