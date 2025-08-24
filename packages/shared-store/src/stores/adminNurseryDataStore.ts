import { create } from "zustand";
import { TAdminDashboardNurseriesData } from "@repo/common-types";

interface AdminNurseryDataProps {
  nurseriesData: TAdminDashboardNurseriesData[];
  setNurseriesData: (newValue: TAdminDashboardNurseriesData[]) => void;
}

export const useAdminNurseryDataStore = create<AdminNurseryDataProps>(
  (set) => ({
    nurseriesData: [],
    setNurseriesData: (newValue: TAdminDashboardNurseriesData[]) =>
      set({ nurseriesData: newValue }),
  })
);
