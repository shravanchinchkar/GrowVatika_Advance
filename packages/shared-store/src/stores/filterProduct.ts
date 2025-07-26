import { create } from "zustand";

export const useFilterProduct = create((set) => ({
  filter: [],

  // Set the entire filter array
  setFilter: (newFilter: string) => set({ filter: newFilter }),

  // Add a filter to the array (if not already present)
  addFilter: (filterItem: string) =>
    set((state: any) => ({
      filter: state.filter.includes(filterItem)
        ? state.filter
        : [...state.filter, filterItem],
    })),

  removeFilter: (filterItem: string) =>
    set((state: any) => ({
      filter: state.filter.filter((item: any) => item !== filterItem),
    })),

  // Toggle a filter (add if not present, remove if present)
  toggleFilter: (filterItem: string) =>
    set((state: any) => ({
      filter: state.filter.includes(filterItem)
        ? state.filter.filter((item: any) => item !== filterItem)
        : [...state.filter, filterItem],
    })),

  // Clear all filters
  clearFilters: () => set({ filter: [] }),
}));
