import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PRState } from "../interfaces/prGenerator.interface";

const usePRStore = create<PRState>()(
  persist(
    (set) => ({
      isGenerateTitleEnabled: true,
      IsGenerateDescriptionEnabled: true,
      instructions: "",
      titleResult: "",
      descriptionResult: "",
      isLoading: false,

      setIsGenerateTitleEnabled: (isTitleEnabled: boolean) =>
        set({ isGenerateTitleEnabled: isTitleEnabled }),
      setIsGenerateDescriptionEnabled: (isDescriptionEnabled: boolean) =>
        set({ IsGenerateDescriptionEnabled: isDescriptionEnabled }),
      setInstructions: (updatedInstructions: string) =>
        set({ instructions: updatedInstructions }),
      setResults: (title: string, description: string) =>
        set({ titleResult: title, descriptionResult: description }),
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "pr-generator-storage",
    },
  ),
);

export default usePRStore;
