"use client";

import { AdminDashboard } from "./admin-dashboard";
import { RemoveNurseryMessage } from "./remove-nursery-message";
import { useRemoveNurseryMessageStore } from "@repo/shared-store";

export const AdminHome = () => {
  const { message } = useRemoveNurseryMessageStore();
  return (
    <div
      className={`relative w-[100%] h-[100%] ${message.display && "overflow-hidden"} `}
    >
      <AdminDashboard />
      {message.display && <RemoveNurseryMessage />}
    </div>
  );
};
