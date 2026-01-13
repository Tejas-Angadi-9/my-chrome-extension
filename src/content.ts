const isGithubPRPage = () => {
  const { hostname, pathname } = window.location;

  console.log("HOSTNAME: ", hostname);
  console.log("PATHNAME: ", pathname);

  if (hostname === "github.com" && pathname.includes("/compare")) {
    console.log("Hi from PR PAGE");
  }
};

console.log("✅ GitHub PR Page detected:", window.location.href);
isGithubPRPage();
