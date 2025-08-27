"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NuqsAdapter>
        <Toaster />
        {children}
      </NuqsAdapter>
    </SessionProvider>
  );
}
