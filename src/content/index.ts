import type { PRExtractedData } from "../shared/types";
import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";

const main = async (prOptions: any) => {
  if (!isGithubPRPage()) return;
  console.log("prOptions2: ", prOptions);
  const PrPayload: PRExtractedData = await waitForCommits();
  console.log("PrPayload: ", PrPayload);

  chrome.runtime.sendMessage({ type: "ANALYZE_PR", PrPayload });
};

chrome.runtime.onMessage.addListener((message) => {
  const prOptions = message.prOptions;
  if (!prOptions) {
    console.log("No PR Options found");
    return;
  }
  console.log("prOptions1: ", prOptions);

  if (message.type === "RUN_PR_EXTRACTION") {
    console.log("Message: ", prOptions);
    main(prOptions);
  }
});
