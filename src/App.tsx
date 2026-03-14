import { useEffect, useState } from "react";
import usePRStore from "./store/prGenerator.store";
import Loading from "./components/common/Loading";
import Error from "./components/common/Error";
import InvalidComparePage from "./components/common/InvalidComparePage";
import useApiKeyStore from "./store/apiKey.store";
import PRGenerator from "./pages/PRGenerator";
import OnboardingScreen from "./components/OnboardingScreen";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGithubComparePage, setIsGithubComparePage] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let isComparePage: boolean = false;
  const { apiKey } = useApiKeyStore();

  //! Move this to hooks part
  const checkBrowserUrl = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Move this hard coded string of chrome type to constant
      if (typeof chrome === "undefined" || !chrome.tabs) {
        // TODO: Move this hard coded string of error message to constant
        setError("Extension context not available");
        return;
      }

      const [currentTab]: chrome.tabs.Tab[] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const url: string | undefined = currentTab?.url;
      if (!url) {
        setIsGithubComparePage(false);
        return;
      }

      try {
        const { hostname, pathname } = new URL(url);
        // TODO: Move this hard coded string of hostname and pathname to constant
        isComparePage =
          hostname === "github.com" && pathname.includes("/compare");
      } catch {
        isComparePage = false;
      }

      setIsGithubComparePage(isComparePage);
    } catch (error: unknown) {
      // TODO: Move this hard coded string of error message to constant
      const errorMessage: string = "Failed to check tab URL";
      setError(errorMessage);
      setIsGithubComparePage(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    usePRStore.getState().setIsLoading(false);
    checkBrowserUrl();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!isGithubComparePage) {
    return <InvalidComparePage />;
  }

  if (!apiKey) {
    return <OnboardingScreen />;
  }

  return (
    <div className="min-h-[var(--popup-min-height)] flex flex-col bg-transparent items-center justify-center mx-auto">
      <PRGenerator />
    </div>
  );
};

export default App;
