import usePRStore from "../store/prGenerator.store";
import toast from "react-hot-toast";
import { MESSAGE_TYPES, ERROR_MESSAGES } from "../shared/constants";

let isListenerRegistered: boolean = false;

export const setupMessageListener = () => {
  if (typeof chrome === "undefined" || !chrome.runtime.onMessage) {
    return;
  }

  if (isListenerRegistered) return;
  isListenerRegistered = true;

  const { setTitle, setDescription, setIsLoading } = usePRStore.getState();
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === MESSAGE_TYPES.PR_ANALYSIS_COMPLETE) {
      const geminiText: string = message.result;

      const firstNewline: number = geminiText.indexOf("\n");
      const hasMultipleLines: boolean = firstNewline !== -1;

      const firstLine: string = hasMultipleLines
        ? geminiText.slice(0, firstNewline).trim()
        : geminiText.trim();
      const rest: string = hasMultipleLines
        ? geminiText.slice(firstNewline + 1).trim()
        : "";

      const isJustDescriptionGenerated: boolean = firstLine.startsWith("#");
      const isJustTitleGenerated: boolean =
        !isJustDescriptionGenerated && !rest;

      const titleResult: string = isJustDescriptionGenerated ? "" : firstLine;
      const descriptionResult: string =
        isJustDescriptionGenerated || isJustTitleGenerated
          ? isJustDescriptionGenerated
            ? geminiText.trim()
            : ""
          : rest;

      if (titleResult) setTitle(titleResult);
      if (descriptionResult) setDescription(descriptionResult);
      setIsLoading(false);
    }

    if (message.type === MESSAGE_TYPES.PR_ANALYSIS_FAILED) {
      toast.error(message.errorMessage || ERROR_MESSAGES.GENERIC_ERROR);
      setIsLoading(false);
    }
  });
};
