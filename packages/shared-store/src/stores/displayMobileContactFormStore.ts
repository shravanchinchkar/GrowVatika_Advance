import { create } from "zustand";
interface MobileConnectFormVisibilityProps {
  isMobileContactFormVisible: boolean;
  setVisibilityOfMobileContactForm: (newValue: boolean) => void;
}
export const useChangeMobileConnectFormVisibility =
  create<MobileConnectFormVisibilityProps>((set) => ({
    isMobileContactFormVisible: false,
    setVisibilityOfMobileContactForm: (newValue: boolean) =>
      set({ isMobileContactFormVisible: newValue }),
  }));
