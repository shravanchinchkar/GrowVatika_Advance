import { create } from "zustand";

interface UserProfileVisibility {
  isUserProfileVisible: boolean;
  setVisibilityOfUserProfile: (newValue: boolean) => void;
}
export const useUserProfileVisibilityStore = create<UserProfileVisibility>(
  (set) => ({
    isUserProfileVisible: false,
    setVisibilityOfUserProfile: (newValue: boolean) =>
      set({ isUserProfileVisible: newValue }),
  })
);
