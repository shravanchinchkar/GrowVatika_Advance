import { create } from "zustand";

export const useActiveSellerDashboardSideBar = create((set) => ({
  activeSideBar: "dashboard",
  updateActiveSideBar: (newActiveSideBar: string) =>
    set({ activeSideBar: newActiveSideBar }),
}));
