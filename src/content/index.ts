import type { PRExtractedData } from "../shared/types";
import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";
import { INPUT_FIELD, DESCRIPTION_FIELD } from "../shared/constants";

const main = async (prOptions: any) => {
  if (!isGithubPRPage()) return;
  const PrPayload: PRExtractedData = await waitForCommits();
  const updatedPrPayload = { ...prOptions, PrPayload };

  chrome.runtime.sendMessage({
    type: "ANALYZE_PR",
    PrPayload: updatedPrPayload,
  });
};

const applyChangesToGitHub = (title: string, description: string) => {
  const titleSelectors = [`.${INPUT_FIELD}`];

  const descriptionSelectors = [`.${DESCRIPTION_FIELD}`];

  let titleElement = null;
  for (const selector of titleSelectors) {
    titleElement = document.querySelector(selector) as HTMLInputElement;
    if (titleElement) {
      titleElement.value = title;
      titleElement.dispatchEvent(new Event("input", { bubbles: true }));
      titleElement.dispatchEvent(new Event("change", { bubbles: true }));
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
    return;
  }

  if (message.type === "RUN_PR_EXTRACTION") {
    main(prOptions);
  }
});
