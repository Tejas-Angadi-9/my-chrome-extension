import { ActionButtons } from "../components/ActionButtons";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { Header } from "../components/Header";
import { InstructionTextarea } from "../components/InstructionTextarea";
import { ResultSection } from "../components/ResultSection";
import { usePRStore } from "../store/prGenerator.store";

export default function PRGenerator() {
  const { titleResult, descriptionResult } = usePRStore();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 w-full max-w-[var(--popup-width)]">
      <Header />
      <CheckboxGroup />
      <InstructionTextarea />
      <ActionButtons />
      {(titleResult || descriptionResult) && <ResultSection />}
    </div>
  );
}
