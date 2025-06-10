import { create } from "zustand";

export const displayAddProductSectionStore = create((set) => ({
  displayAddProductSection: false,
  updateDisplayAddProductSectionStore: (newVisibility: boolean) =>
    set({ displayAddProductSection: newVisibility }),
}));
