import { isGithubPRPageUrl } from "../utils/github";

export const isGithubPRPage = (): boolean => {
  const currentUrl: string = window.location.href;
  const isPRPage: boolean = isGithubPRPageUrl(currentUrl);
  return isPRPage;
};
