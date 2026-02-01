import {
  BRANCH_SELECTOR,
  COMMIT_MESSAGE_SELECTOR,
  FILENAME_SELECTOR,
} from "../../shared/constants";
import type { BranchType } from "../../shared/types";

// TODO: Add a TS type
export const extractCommitMessages = (): string[] => {
  const commits: any = document.querySelectorAll(COMMIT_MESSAGE_SELECTOR);

  const commitsArray: string[] = Array.from(commits).map((commit) =>
    (commit as HTMLElement).innerText.trim(),
  );
  return commitsArray;
};

export const extractBranchName = (
  currentBranch: BranchType,
): string | undefined => {
  const branches: HTMLCollectionOf<Element> =
    document.getElementsByClassName(BRANCH_SELECTOR);

  const branch: string =
    currentBranch === "base"
      ? branches[1].textContent.trim()
      : branches[3].textContent.trim();

  return branch;
};

export const extractFileNames = (): string[] => {
  const fileNamesElement = document.getElementsByClassName(FILENAME_SELECTOR);
  const fileNames: string[] = Array.from(fileNamesElement).map((fileName) =>
    (fileName as HTMLElement).innerText.trim(),
  );
  return fileNames;
};
