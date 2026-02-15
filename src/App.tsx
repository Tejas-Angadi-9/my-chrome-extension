import { useEffect, useState } from "react";
import PRGenerator from "./pages/PRGenerator";
import { LuGithub } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGithubComparePage, setIsGithubComparePage] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  let isComparePage: boolean = false;

  const checkBrowserUrl = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (typeof chrome === "undefined" || !chrome.tabs) {
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
        isComparePage =
          hostname === "github.com" && pathname.includes("/compare");
      } catch {
        isComparePage = false;
      }

      setIsGithubComparePage(isComparePage);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to check tab URL",
      );
      setIsGithubComparePage(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkBrowserUrl();
  }, []);

  return (
    <div className="min-h-[var(--popup-min-height)] flex flex-col bg-transparent items-center justify-center mx-auto">
      {isLoading ? (
        <div className="flex min-h-[var(--popup-min-height)] flex-col items-center justify-center gap-4 p-8">
          <div className="relative">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
            <div className="absolute inset-0 h-10 w-10 rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-transparent blur-sm" />
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Checking page...
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Making sure you're on GitHub compare
          </p>
        </div>
      ) : error ? (
        <div className="flex min-h-[var(--popup-min-height)] flex-col gap-4 p-6">
          <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
              <AiOutlineExclamationCircle size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                Something went wrong
              </p>
              <p
                className="mt-0.5 text-xs text-[var(--text-muted)]"
                role="alert">
                {error}
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-[var(--text-muted)]">
            Try refreshing the extension or opening a new tab
          </p>
        </div>
      ) : isGithubComparePage ? (
        <PRGenerator />
      ) : (
        <div className="flex min-h-[var(--popup-min-height)] flex-col items-center justify-center gap-5 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-end)]/10 ring-1 ring-[var(--border)]">
            <LuGithub size={30} className="text-[var(--accent)]" />
          </div>
          <div className="space-y-1.5">
            <p className="text-base font-semibold text-[var(--text-primary)]">
              Navigate to a compare page
            </p>
            <p className="max-w-[240px] text-sm leading-relaxed text-[var(--text-secondary)]">
              Open a GitHub compare page to generate PR titles and descriptions
              from your changes
            </p>
          </div>
          <div className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">github.com</span>
            <span>/owner/repo/compare/base...head</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
