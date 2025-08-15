import { create } from "zustand";

interface FilterProductByCategoryState {
  category: string;
  setCategory: (newCategory: string) => void;
}
export const usefilterProductByCategoryStore =
  create<FilterProductByCategoryState>((set) => ({
    category: "All",
    setCategory: (newCategory: string) => set({ category: newCategory }),
  }));
