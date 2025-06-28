import { create } from "zustand";

interface DropdownState {
  openDropdown: string | null;
  setOpenDropdown: (dropdownKey: string | null) => void;
  closeAllDropdowns: () => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  openDropdown: null,
  setOpenDropdown: (dropdownKey) => set({ openDropdown: dropdownKey }),
  closeAllDropdowns: () => set({ openDropdown: null }),
}));
