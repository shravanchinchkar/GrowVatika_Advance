import { create } from "zustand";

export const useChangeMobileNavbarVisibility = create((set) => ({
  displayMobileNavbar: false,
  updateMobileNarbarVisibility: (newStatus: boolean) =>
    set({ displayMobileNavbar: newStatus }),
}));
