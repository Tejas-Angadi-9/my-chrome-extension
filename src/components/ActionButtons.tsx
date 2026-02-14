import { useRef } from "react";
import { usePRStore } from "../store/prGenerator.store";
import { setupMessageListener } from "../utils/setupMessageListener";

export const ActionButtons = () => {
  const { isLoading, setIsLoading } = usePRStore();
  const listenerSetup = useRef(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      if (!listenerSetup.current) {
        setupMessageListener();
        listenerSetup.current = true;
      }

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });


      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, {
          type: "RUN_PR_EXTRACTION",
        });
      }
    } catch (error) {
      console.error("Error occured while generating the response: ", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isLoading}
      className="w-full rounded-[var(--radius)] bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--accent)] cursor-pointer">
      {isLoading ? "Generating..." : "Generate"}
    </button>
  );
};
