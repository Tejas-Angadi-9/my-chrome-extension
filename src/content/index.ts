import type { PRExtractedData } from "../shared/types";
import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";
import { INPUT_FIELD, DESCRIPTION_FIELD } from "../shared/constants";

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

const applyChangesToGitHub = (title: string, description: string) => {
  // TODO: Add other selectors too as a backup
  const titleSelectors = [`.${INPUT_FIELD}`];

  // TODO: Add other selectors too as a backup
  const descriptionSelectors = [`.${DESCRIPTION_FIELD}`];

  let titleElement = null;
  for (const selector of titleSelectors) {
    titleElement = document.querySelector(selector) as HTMLInputElement;
    if (titleElement) {
      titleElement.value = title;
      titleElement.dispatchEvent(new Event("input", { bubbles: true }));
      titleElement.dispatchEvent(new Event("change", { bubbles: true }));
      // TODO: Remove this once developement is completed
      console.log("✅ Title injected:", title);
      break;
    }
  }
  if (!titleElement) {
    console.warn("⚠️ Could not find GitHub PR title field");
  }

  let descriptionElement = null;
  for (const selector of descriptionSelectors) {
    descriptionElement = document.querySelector(
      selector,
    ) as HTMLTextAreaElement;
    if (descriptionElement) {
      descriptionElement.value = description;
      descriptionElement.dispatchEvent(new Event("input", { bubbles: true }));
      descriptionElement.dispatchEvent(new Event("change", { bubbles: true }));
      console.log("✅ Description injected:", description);
      break;
    }
  }
  if (!descriptionElement) {
    console.warn("⚠️ Could not find GitHub PR description field");
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "APPLY_CHANGES") {
    applyChangesToGitHub(message.title, message.description);
    return;
  }

  const prOptions = message.prOptions;
  if (!prOptions) {
    console.log("No PR Options found");
    return;
  }

  if (message.type === "RUN_PR_EXTRACTION") {
    main(prOptions);
  }
});
