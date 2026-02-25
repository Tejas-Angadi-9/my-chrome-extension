import type { IhandleAnalaysePrMessage } from "../interfaces/backgroundMessage.interface";
import type { PRExtractedData } from "../shared/types";
import { analyzePRWithGemini } from "./gemini.service";

console.log("🧩 BACKGROUND SERVICE WORKER LOADED");

const notifyPrAnalysisComplete = async (result: string | undefined) => {
  try {
    await chrome.runtime.sendMessage({
      type: "PR_ANALYSIS_COMPLETE",
      result: result,
    });
  } catch (error) {
    console.log("Popup not open: ", error);
  }
};

const handleAnalysePrMessage = async ({
  payload,
  sendResponse,
}: IhandleAnalaysePrMessage): Promise<void> => {
  try {
    const result: string | undefined = await analyzePRWithGemini(payload);
    console.log("✅ Gemini result ready:", result);
    sendResponse({ success: true, result });
    await notifyPrAnalysisComplete(result);
  } catch (error) {
    const message: string =
      error instanceof Error ? error.message : String(error);
    sendResponse({ success: false, error: message });
  }
};

// Main Entry point
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type !== "ANALYSE_PR") {
    console.log("Message Type is not ANALYSE_PR");
    return;
  }

  void handleAnalysePrMessage({
    payload: message.PrPayload as PRExtractedData,
    sendResponse,
  });
  return true;
});
