import { PROMISE_INTERVAL, TIMEOUT_SAFEGUARD } from "../shared/constants";
import type { PRExtractedData } from "../shared/types";
import {
  extractBranchName,
  extractCommitMessages,
  extractFileNames,
} from "./extractors/content";

export const waitForCommits = (): Promise<PRExtractedData> => {
  const PrExtractedResponse: Promise<PRExtractedData> = new Promise(
    (resolve, reject) => {
      const startedAt = Date.now();

      const intervalId = setInterval(() => {
        const commits: string[] = extractCommitMessages();
        const baseBranch: string | undefined = extractBranchName("base");
        const compareBranch: string | undefined = extractBranchName("compare");
        const fileNames: string[] = extractFileNames();

        const hasAllData =
          commits.length > 0 &&
          fileNames.length > 0 &&
          baseBranch &&
          compareBranch;

        if (hasAllData) {
          clearInterval(intervalId);
          resolve({
            commitHints: commits,
            branches: { base: baseBranch, compare: compareBranch },
            filesNames: fileNames,
          });
          return;
        }

        if (Date.now() - startedAt > TIMEOUT_SAFEGUARD) {
          clearInterval(intervalId);
          reject("Timed out waiting for PR data");
        }
      }, PROMISE_INTERVAL);
    },
  );
  return PrExtractedResponse;
};
