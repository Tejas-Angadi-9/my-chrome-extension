import type { PRExtractedData } from "../shared/types";
import { analyzePRWithGemini } from "./gemini.service";

console.log("🧩 BACKGROUND SERVICE WORKER LOADED");

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "ANALYZE_PR") {
    analyzePRWithGemini(message.PR_Payload as PRExtractedData)
      .then((result) => {
        sendResponse({ success: true, result });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
