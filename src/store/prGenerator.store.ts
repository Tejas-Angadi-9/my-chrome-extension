import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PRState {
  generateTitle: boolean;
  generateDescription: boolean;
  instructions: string;

  titleResult: string;
  descriptionResult: string;

  isLoading: boolean;

  setGenerateTitle: (value: boolean) => void;
  setGenerateDescription: (value: boolean) => void;
  setInstructions: (value: string) => void;

  setResults: (title: string, desc: string) => void;
  setLoading: (value: boolean) => void;
}

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
