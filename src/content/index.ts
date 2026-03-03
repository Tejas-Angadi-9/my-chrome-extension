import type { PRExtractedData } from "../shared/types";
import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";

const main = async (prOptions: any) => {
  if (!isGithubPRPage()) return;
  const PrPayload: PRExtractedData = await waitForCommits();
  const updatedPrPayload = { ...prOptions, PrPayload };

  // TODO: Remove this print statement, once development is done
  console.log("prPayload: ", updatedPrPayload);
  chrome.runtime.sendMessage({
    type: "ANALYZE_PR",
    PrPayload: updatedPrPayload,
  });
};

chrome.runtime.onMessage.addListener((message) => {
  const prOptions = message.prOptions;
  if (!prOptions) {
    console.log("No PR Options found");
    return;
  }

  if (message.type === "RUN_PR_EXTRACTION") {
    main(prOptions);
  }
});
