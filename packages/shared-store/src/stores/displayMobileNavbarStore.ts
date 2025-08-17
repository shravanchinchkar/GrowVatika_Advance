import { create } from "zustand";

interface MobileNavbarVisibilityProps {
  isMobileNavbarVisible: boolean;
  setVisibilityOfMobileNavbar: (newValue: boolean) => void;
}
export const useChangeMobileNavbarVisibility =
  create<MobileNavbarVisibilityProps>((set) => ({
    isMobileNavbarVisible: false,
    setVisibilityOfMobileNavbar: (newValue: boolean) =>
      set({ isMobileNavbarVisible: newValue }),
  }));
