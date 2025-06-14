"use client"

import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`bg-[#161931] bg-[url('/images/background.png')] bg-cover bg-center h-[100svh]`}
    >
      {children}
    </div>
  );
}