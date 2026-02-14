import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";

const main = async () => {
  // Checking whether the current page is github in PR Page or not
  if (!isGithubPRPage()) return;

  // Extracting commit messages using vanilla JS
  const PrPayload = await waitForCommits();
  console.log("PrPayload: ", PrPayload);
  chrome.runtime.sendMessage({ type: "ANALYZE_PR", PrPayload });
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "RUN_PR_EXTRACTION") {
    main();
  }
});
