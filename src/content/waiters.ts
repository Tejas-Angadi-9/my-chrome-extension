import { PROMISE_INTERVAL, TIMEOUT_SAFEGUARD } from "../shared/constants";
import type { PRExtractedData } from "../shared/types";
import {
  extractBranchName,
  extractCommitMessages,
  extractFileNames,
} from "./extractors/content";

export const waitForCommits = (): Promise<PRExtractedData> => {
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
