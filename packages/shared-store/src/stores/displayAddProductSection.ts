import { create } from "zustand";

export const useDisplayAddProductSectionStore = create((set) => ({
  displayAddProductSection: false,
  updateDisplayAddProductSectionStore: (newVisibility: boolean) =>
    set({ displayAddProductSection: newVisibility }),
}));
