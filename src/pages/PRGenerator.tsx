import { ActionButtons } from "../components/ActionButtons";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { Header } from "../components/Header";
import { InstructionTextarea } from "../components/InstructionTextarea";
import { ResultSection } from "../components/ResultSection";
import { usePRStore } from "../store/prGenerator.store";

export default function PRGenerator() {
  const { titleResult, descriptionResult } = usePRStore();

  return (
    <div className="w-90 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col gap-4 font-sans text-white">
      <Header />
      <CheckboxGroup />
      <InstructionTextarea />
      <ActionButtons />
      {/* <SubmitButton /> */}
      {(titleResult || descriptionResult) && <ResultSection />}
    </div>
  );
}
