import { create } from "zustand";

export const useChangeMobileConnectFormVisibility = create((set) => ({
  displayMCForm: false,
  updateMCFormVisibility: (newStatus: boolean) =>
    set({ displayMCForm: newStatus }),
}));
