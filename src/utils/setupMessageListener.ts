import usePRStore from "../store/prGenerator.store";

export const setupMessageListener = () => {
  if (typeof chrome === "undefined" || !chrome.runtime.onMessage) {
    return;
  }

  const { setTitle, setDescription, setIsLoading } = usePRStore.getState();
  chrome.runtime.onMessage.addListener((message) => {
    // TODO: Remove this once developement is completed
    console.log("📨 Message received:", message);

    // TODO: There is hard coding of string, please move it to constants or other file
    if (message.type === "PR_ANALYSIS_COMPLETE") {
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
  });
};
