import { useEffect } from "react";
import { ActionButtons } from "../components/ActionButtons";
import { CheckboxGroup } from "../components/CheckboxGroup";
import { Header } from "../components/Header";
import { InstructionTextarea } from "../components/InstructionTextarea";
import { ResultSection } from "../components/ResultSection";
import usePRStore from "../store/prGenerator.store";

export default function PRGenerator() {
  const { titleResult, descriptionResult } = usePRStore();
  console.log("Typeof Title: ", typeof titleResult);
  console.log("Typeof Description: ", typeof descriptionResult);
  const applyChangesHandler = async () => {
    console.log("HELLO FROM CLICK HANDLER");
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab?.id) {
        console.log("HELLO INSIDE IF BLOCK");
        await chrome.tabs.sendMessage(tab.id, {
          type: "APPLY_CHANGES",
          title: titleResult,
          description: descriptionResult,
        });
      }
    } catch (error) {
      console.error("Error occured while applying changes to github: ", error);
    }
  };
  /* TODO: Checking if there is update in the states
  At default, I'm getting the mock data.
  Replace this mock data with the response */
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
      {(titleResult || descriptionResult) && (
        <button
          className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer"
          onClick={applyChangesHandler}>
          Apply Changes
        </button>
      )}
    </div>
  );
}
