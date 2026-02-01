import { isGithubPRPage } from "./detector";
import { waitForCommits } from "./waiters";

const main = async () => {
  // Checking whether the current page is github in PR Page or not
  if (!isGithubPRPage()) return;

  // Extracting commit messages using vanilla JS
  const PR_Payload = await waitForCommits();
  console.log("PR_Payload: ", PR_Payload);
  chrome.runtime.sendMessage({ type: "ANALYZE_PR", PR_Payload });
};

main();
