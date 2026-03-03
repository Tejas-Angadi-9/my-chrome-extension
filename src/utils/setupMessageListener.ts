import usePRStore from "../store/prGenerator.store";

export const setupMessageListener = () => {
  if (typeof chrome === "undefined" || !chrome.runtime.onMessage) {
    return;
  }

  const { setResults, setIsLoading } = usePRStore.getState();
  chrome.runtime.onMessage.addListener((message) => {
    console.log("📨 Message received:", message);

    // TODO: There is hard coding of string, please move it to constants or other file
    if (message.type === "PR_ANALYSIS_COMPLETE") {
      const geminiText: string = message.result;

      //! TODO: HIGH PRIORIY -> This is working fine when title and description or title is being selected. But if you just select description, ### summary is being picked as it is the first string. Fix it.
      const [titleResult, descriptionResult] = geminiText.split(/\n(.*)/s);

      setResults(
        titleResult && titleResult.trim(),
        descriptionResult && descriptionResult.trim(),
      );
      setIsLoading(false);
    }
  });
};
