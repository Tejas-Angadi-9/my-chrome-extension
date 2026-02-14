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
      className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none">
      <span className="relative z-10">
        {isLoading ? "Generating..." : "Generate PR"}
      </span>
    </button>
  );
};
