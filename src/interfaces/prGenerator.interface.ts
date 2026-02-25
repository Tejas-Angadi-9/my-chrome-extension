export interface PRState {
  isGenerateTitleEnabled: boolean;
  IsGenerateDescriptionEnabled: boolean;
  instructions: string;
  titleResult: string;
  descriptionResult: string;
  isLoading: boolean;

  setIsGenerateTitleEnabled: (isTitleEnabled: boolean) => void;
  setIsGenerateDescriptionEnabled: (isDescriptionEnabled: boolean) => void;
  setInstructions: (updatedInstructions: string) => void;
  setResults: (title: string, description: string) => void;
  setIsLoading: (loading: boolean) => void;
}
