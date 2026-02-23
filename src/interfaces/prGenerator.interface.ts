export interface PRState {
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
  setIsLoading: (value: boolean) => void;
}
