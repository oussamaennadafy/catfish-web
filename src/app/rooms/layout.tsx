"use client"

import React from "react";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`bg-[#161931] bg-[url('/images/background.png')] bg-cover bg-center h-[100svh]`}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
}