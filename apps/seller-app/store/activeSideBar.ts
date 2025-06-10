import { create } from "zustand";

export const activeSideBarStore = create((set) => ({
  activeSideBar: "dashboard",
  updateActiveSideBar: (newActiveSideBar: string) =>
    set({ activeSideBar: newActiveSideBar }),
}));
