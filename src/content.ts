const isGithubPRPage = (): boolean => {
  const { hostname, pathname } = window.location;

  if (hostname !== "github.com" || !pathname.includes("/compare")) {
    return false;
  }

  // Testing log
  console.log("✅ GitHub PR Page detected:", window.location.href);
  return true;
};

const extractCommitMessages = (): HTMLCollectionOf<Element> => {
  return document.getElementsByClassName(
    "Link--primary text-bold js-navigation-open markdown-title",
  );
};

const waitForCommits = (): Promise<HTMLCollectionOf<Element>> => {
  return new Promise((resolve) => {
    console.log({ resolve });
    const interval = setInterval(() => {
      const commits = extractCommitMessages();
      if (commits.length > 0) {
        clearInterval(interval);
        resolve(commits);
      }
    }, 300);
  });
};

const main = async () => {
  // Checking whether the current page is github in PR Page or not
  if (!isGithubPRPage()) return;

  // Extracting commit messages using vanilla JS
  const commitMessages = await waitForCommits();

  Array.from(commitMessages).forEach((commitMessage) => {
    console.log((commitMessage as HTMLElement).innerText);
  });
};

main();
