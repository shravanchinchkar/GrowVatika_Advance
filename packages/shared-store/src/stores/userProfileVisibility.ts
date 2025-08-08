import { create } from "zustand";
export const useUserProfileVisibilityStore = create((set) => ({
  userProfileVisibility: false,
  updateuserProfileVisibility: (newVisibility: boolean) =>
    set({
      userProfileVisibility: newVisibility,
    }),
}));
