import { GITHUB_HOST, GITHUB_PATHNAME } from "../shared/constants";

export const isGithubPRPage = (): boolean => {
  const { hostname, pathname } = window.location;

  if (hostname !== GITHUB_HOST || !pathname.includes(GITHUB_PATHNAME)) {
    return false;
  }

  //TODO: Testing log -> TO BE REMOVED
  console.log("✅ GitHub PR Page detected:", window.location.href);
  return true;
};
