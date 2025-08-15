import { create } from "zustand";

interface SpecialtiesProps {
  specialties: string[];
  setSpecialties: (newValue: string[]) => void;
  addSpecialties: (newValue: string) => void;
  removeSpecialties: (newValue: string) => void;
  toggleSpecialties: (newValue: string) => void;
  clearSpecialties: () => void;
}

export const useSpecialties = create<SpecialtiesProps>((set) => ({
  specialties: [],

  setSpecialties: (newSpecialty: string[]) =>
    set({ specialties: newSpecialty }),

  // Add a specialty to the array (if not already present)
  addSpecialties: (specialty: string) =>
    set((state: any) => ({
      specialties: state.specialties.includes(specialty)
        ? state.specialties
        : [...state.specialties, specialty],
    })),

  removeSpecialties: (specialty: string) =>
    set((state: any) => ({
      specialties: state.specialties.filter((item: any) => item !== specialty),
    })),

  // Toggle a specialty (add if not present, remove if present)
  toggleSpecialties: (specialty: string) =>
    set((state: any) => ({
      specialties: state.specialties.includes(specialty)
        ? state.specialties.filter((item: any) => item !== specialty)
        : [...state.specialties, specialty],
    })),
  clearSpecialties: () => set({ specialties: [] }),
}));
