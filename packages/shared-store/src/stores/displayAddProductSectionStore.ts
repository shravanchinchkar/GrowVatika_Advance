import { create } from "zustand";
interface AddProductSectionProps {
  displayAddProductSection: boolean;
  setVisibilityOfAddProductSection: (newValue: boolean) => void;
}
export const useDisplayAddProductSectionStore = create<AddProductSectionProps>(
  (set) => ({
    displayAddProductSection: false,
    setVisibilityOfAddProductSection: (newValue: boolean) =>
      set({ displayAddProductSection: newValue }),
  })
);
