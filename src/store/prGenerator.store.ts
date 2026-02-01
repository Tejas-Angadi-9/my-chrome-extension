import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PRState } from "./prGenerator.interface";

export const usePRStore = create<PRState>()(
  persist(
    (set) => ({
      generateTitle: true,
      generateDescription: true,
      instructions: "",

      titleResult: "",
      descriptionResult: "",

      isLoading: false,

      setGenerateTitle: (value) => set({ generateTitle: value }),
      setGenerateDescription: (value) => set({ generateDescription: value }),
      setInstructions: (value) => set({ instructions: value }),

      setResults: (title, desc) =>
        set({ titleResult: title, descriptionResult: desc }),

      setLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: "pr-generator-storage",
    },
  ),
);
