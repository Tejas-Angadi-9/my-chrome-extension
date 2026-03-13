import { useRef } from "react";
import usePRStore from "../store/prGenerator.store";
import { setupMessageListener } from "../utils/setupMessageListener";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../shared/constants";

export const ActionButtons = () => {
  const {
    isLoading,
    setIsLoading,
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
  } = usePRStore();
  const listenerSetup: React.RefObject<boolean> = useRef(false);
  const prOptions = {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
  };

  const handleGenerate = async (): Promise<void> => {
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
          prOptions: prOptions,
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      // TODO: Remove this print statement
      console.error("Error occured while generating the response: ", error);
      toast.error(ERROR_MESSAGES.GENERATE_PR_ERROR);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isLoading}
      className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer">
      <span className="relative z-10">
        {isLoading ? "Generating..." : "Generate PR"}
      </span>
    </button>
  );
};
