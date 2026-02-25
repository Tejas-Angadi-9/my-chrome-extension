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

      const lines: string[] = geminiText.split("\n");

      let titleResult: string = "";
      let descriptionResult: string = "";
      let currentSection: string = "";

      for (const line of lines) {
        if (line.includes("1.") || line.includes("title")) {
          currentSection = "title";
        } else if (line.includes("2.") || line.includes("description")) {
          currentSection = "description";
        } else if (line.trim()) {
          if (currentSection === "title") {
            titleResult += line + "\n";
          } else if (currentSection === "description") {
            descriptionResult += line + "\n";
          }
        }
      }

      setResults(titleResult.trim(), descriptionResult.trim());
      setIsLoading(false);
    }
  });
};
