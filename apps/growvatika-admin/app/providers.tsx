"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      // Add these props to prevent SSR issues
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <Toaster />
      {children}
    </SessionProvider>
  );
}
