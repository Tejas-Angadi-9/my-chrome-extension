import {
  BRANCH_SELECTOR,
  COMMIT_MESSAGE_SELECTOR,
  FILENAME_SELECTOR,
  GITHUB_HOST,
  GITHUB_PATHNAME,
  PROMISE_INTERVAL,
  TIMEOUT_SAFEGUARD,
} from "../shared/constants";
import type { BranchType, PRExtractedData } from "../shared/types";

const isGithubPRPage = (): boolean => {
  const { hostname, pathname } = window.location;

  if (hostname !== GITHUB_HOST || !pathname.includes(GITHUB_PATHNAME)) {
    return false;
  }

  //TODO: Testing log -> TO BE REMOVED
  console.log("✅ GitHub PR Page detected:", window.location.href);
  return true;
};

// TODO: Add a TS type
const extractCommitMessages = (): string[] => {
  const commits: any = document.querySelectorAll(COMMIT_MESSAGE_SELECTOR);

  const commitsArray: string[] = Array.from(commits).map((commit) =>
    (commit as HTMLElement).innerText.trim(),
  );
  return commitsArray;
};

const extractBranchName = (currentBranch: BranchType): string | undefined => {
  const branches: HTMLCollectionOf<Element> =
    document.getElementsByClassName(BRANCH_SELECTOR);

  const branch: string =
    currentBranch === "base"
      ? branches[1].textContent.trim()
      : branches[3].textContent.trim();

  return branch;
};

const extractFileNames = (): string[] => {
  const fileNamesElement = document.getElementsByClassName(FILENAME_SELECTOR);
  const fileNames: string[] = Array.from(fileNamesElement).map((fileName) =>
    (fileName as HTMLElement).innerText.trim(),
  );
  return fileNames;
};

const waitForCommits = (): Promise<PRExtractedData> => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const start = Date.now();
      const commits = extractCommitMessages();
      const baseBranch = extractBranchName("base");
      const compareBranch = extractBranchName("compare");
      const fileNames = extractFileNames();
      if (
        commits.length > 0 &&
        fileNames.length > 0 &&
        baseBranch &&
        compareBranch
      ) {
        clearInterval(interval);
        resolve({
          commitHints: commits,
          branches: { base: baseBranch, compare: compareBranch },
          filesNames: fileNames,
        });
      }

      // timeout safeguard (10s)
      if (Date.now() - start > TIMEOUT_SAFEGUARD) {
        clearInterval(interval);
        reject("Timed out waiting for PR data");
      }
    }, PROMISE_INTERVAL);
  });
};

const main = async () => {
  // Checking whether the current page is github in PR Page or not
  if (!isGithubPRPage()) return;

  // Extracting commit messages using vanilla JS
  const PR_Payload = await waitForCommits();
  console.log("PR_Payload: ", PR_Payload);
};

main();
