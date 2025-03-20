"use client"

import AvatarsList from "@/features/authentication/components/AvatarsList";
import { persistor, store } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react"
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const handleLogoClick = useCallback(() => {
    router.push("/rooms");
  }, [router])
  return (
    <div className="h-full flex items-center justify-evenly lg:justify-around flex-col min-h-[100svh] gap-6 lg:gap-10 py-6 lg:py-12">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* image */}
          <div className="absolute top-0 left-0 right-0 w-full -z-10 bg-[url('/images/friends-pic.png')] h-1/2 bg-cover bg-center" />

          {/* Purple overlay */}
          <div className="absolute top-0 left-0 right-0 w-full h-1/2 bg-gradient-to-b from-[#642e93c1] to-[#8045b35b]" />

          {/* title */}
          <button onClick={handleLogoClick} className="z-10 flex items-center justify-center gap-4 cursor-pointer">
            <Image
              src="/icons/logo.svg"
              priority
              width={40}
              height={40}
              alt='catfish logo'
            />
            <p className="font-bold text-xl">CatfishMeet</p>
          </button>

          {/* card */}
          <div className="w-5/6 sm:w-4/6 lg:w-2/6 rounded-2xl backdrop-blur-2xl flex items-center justify-center border border-gray-500/30">
            {children}
          </div>

          {/* avatars */}
          <AvatarsList />
        </PersistGate>
      </Provider>
    </div>
  );
}
