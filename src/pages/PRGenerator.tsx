import { useEffect } from "react";
import { ActionButtons } from "../components/ActionButtons";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { Header } from "../components/Header";
import { InstructionTextarea } from "../components/InstructionTextarea";
import { ResultSection } from "../components/ResultSection";
import { usePRStore } from "../store/prGenerator.store";

export default function PRGenerator() {
  const { titleResult, descriptionResult } = usePRStore();
  // TODO: Checking if there is update in the states
  // TODO: At default, I'm getting the mock data.
  // TODO: Replace this mock data with the response
  useEffect(() => {
    console.log({
      titleResult: titleResult,
      descriptionResult: descriptionResult,
    });
  }, [titleResult, descriptionResult]);

  return (
    <div className="flex flex-1 flex-col gap-5 p-5 w-full max-w-[var(--popup-width)]">
      <Header />
      <CheckboxGroup />
      <InstructionTextarea />
      <ActionButtons />
      {(titleResult || descriptionResult) && <ResultSection />}
    </div>
  );
}
