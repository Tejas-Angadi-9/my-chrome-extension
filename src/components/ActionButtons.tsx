import { useCallback, useEffect } from "react";
import usePRStore from "../store/prGenerator.store";
import { setupMessageListener } from "../utils/setupMessageListener";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../shared/constants";
import { getApiKey } from "../utils/chromeStorage";
import useApiKeyStore from "../store/apiKey.store";

export const ActionButtons = () => {
  const {
    isLoading,
    setIsLoading,
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
  } = usePRStore();
  const { setApiKey } = useApiKeyStore();

  useEffect(() => {
    setupMessageListener();
  }, []);

  const prOptions = {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
  };

  const buttonLabel = useCallback((): string => {
    if (isGenerateTitleEnabled && !isGenerateDescriptionEnabled)
      return "Generate Title";
    else if (!isGenerateTitleEnabled && isGenerateDescriptionEnabled)
      return "Generate Description";
    return "Generate PR";
  }, [isGenerateTitleEnabled, isGenerateDescriptionEnabled]);

  const handleGenerate = async (): Promise<void> => {
    if (!isGenerateTitleEnabled && !isGenerateDescriptionEnabled) {
      toast.error(ERROR_MESSAGES.SELECT_TITLE_OR_DESCRIPTION);
      return;
    }
    const apiKey = await getApiKey();
    if (!apiKey) {
      setIsLoading(false);
      setApiKey(null);
      toast.error(ERROR_MESSAGES.API_KEY_MISSING);
      return;
    }
    setIsLoading(true);
    try {
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
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={
        isLoading || (!isGenerateTitleEnabled && !isGenerateDescriptionEnabled)
      }
      className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer">
      <span className="relative z-10">
        {isLoading ? "Generating..." : buttonLabel()}
      </span>
    </button>
  );
};
