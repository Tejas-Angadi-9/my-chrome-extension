import { GITHUB_HOST, GITHUB_PATHNAME } from "../shared/constants";

export function isGithubPRPageUrl(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    const isPrPage: boolean = hostname === GITHUB_HOST && pathname.includes(GITHUB_PATHNAME);
    return isPrPage;
  } catch {
    return false;
  }
}