import CallFram from "@/features/callHub/components/CallFram";
import Header from "@/features/callHub/components/Header";
import TabBar from "@/features/callHub/components/TabBar";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 h-full w-full p-6">
      <Header />
      <CallFram />
      <TabBar />
    </div>
  );
}
