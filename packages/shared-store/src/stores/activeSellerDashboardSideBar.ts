import { create } from "zustand";
interface SiderBarProps {
  activeSideBar: string;
  setActiveSideBar: (newValue: string) => void;
}
// dashboard
export const useActiveSellerDashboardSideBar = create<SiderBarProps>((set) => ({
  activeSideBar: "dashboard",
  setActiveSideBar: (newValue: string) => set({ activeSideBar: newValue }),
}));
