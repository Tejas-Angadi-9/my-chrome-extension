import type { PRExtractedData } from "../shared/types";
import { analyzePRWithGemini } from "./gemini.service";

console.log("🧩 BACKGROUND SERVICE WORKER LOADED");

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "ANALYZE_PR") {
    analyzePRWithGemini(message.PR_Payload as PRExtractedData)
      .then((result) => {
        console.log("✅ Gemini result ready:", result);
        sendResponse({ success: true, result });
        chrome.runtime
          .sendMessage({
            type: "PR_ANALYSIS_COMPLETE",
            result: result,
          })
          .catch((error) => console.log("Popup not open: ", error));
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
