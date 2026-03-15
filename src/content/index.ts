import type { PRExtractedData } from "../shared/types";
import type { BuildPRPromptOptions } from "../interfaces/backgroundScripts.interface";
import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";
import {
  INPUT_FIELD,
  DESCRIPTION_FIELD,
  MESSAGE_TYPES,
} from "../shared/constants";

const main = async (prOptions: Omit<BuildPRPromptOptions, "PrPayload">) => {
  if (!isGithubPRPage()) return;
  const PrPayload: PRExtractedData = await waitForCommits();
  const updatedPrPayload = { ...prOptions, PrPayload };

  chrome.runtime.sendMessage({
    type: MESSAGE_TYPES.ANALYZE_PR,
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
  if (message.type === MESSAGE_TYPES.APPLY_CHANGES) {
    applyChangesToGitHub(message.title, message.description);
    return;
  }

  const prOptions = message.prOptions;
  if (!prOptions) {
    return;
  }

  if (message.type === MESSAGE_TYPES.RUN_PR_EXTRACTION) {
    main(prOptions);
  }
});
