// utils/handleGenerate.ts
import { toast } from "react-hot-toast";
import { ERROR_MESSAGES, MESSAGE_TYPES } from "../shared/constants";
import { getApiKey } from "./chromeStorage";
import usePRStore from "../store/prGenerator.store";
import useApiKeyStore from "../store/apiKey.store";

const handleGenerate = async () => {
  const {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
    setIsLoading,
  } = usePRStore.getState();
  const { setApiKey } = useApiKeyStore.getState();

  const prOptions = {
    isGenerateTitleEnabled,
    isGenerateDescriptionEnabled,
    instructions,
  };

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
        type: MESSAGE_TYPES.RUN_PR_EXTRACTION,
        prOptions,
      });
    } else {
      setIsLoading(false);
    }
  } catch {
    setIsLoading(false);
  }
};

export default handleGenerate;
