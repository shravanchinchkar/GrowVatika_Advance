import { create } from "zustand";

interface DropdownUserState {
  openDropdown: string | null;
  setOpenDropdown: (dropdownKey: string | null) => void;
  closeAllDropdowns: () => void;
}

export const useDropdownUserStore = create<DropdownUserState>((set) => ({
  openDropdown: null,
  setOpenDropdown: (dropdownKey) => set({ openDropdown: dropdownKey }),
  closeAllDropdowns: () => set({ openDropdown: null }),
}));
