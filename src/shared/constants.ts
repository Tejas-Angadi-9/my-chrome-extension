export const GITHUB_HOST: string = "github.com";
export const GITHUB_PATHNAME: string = "/compare";

export const COMMIT_MESSAGE_SELECTOR: string =
  "a.Link--primary.text-bold.js-navigation-open.markdown-title";
export const BRANCH_SELECTOR: string = "css-truncate css-truncate-target";
export const FILENAME_SELECTOR: string = "Link--primary Truncate-text";

export const INPUT_FIELD = "prc-components-Input-IwWrt";
export const DESCRIPTION_FIELD = "js-comment-field";

export const TIMEOUT_SAFEGUARD: number = 10_000; //* FYI -> Using underscore ( _ ) to improve the readability for large numbers. It works same as 10000 number
export const PROMISE_INTERVAL: number = 300;

export const ERROR_MESSAGES = {
  GENERIC_ERROR: "Something went wrong. Please try again.",
  GENERATE_PR_ERROR: "Failed to generate PR. Please try again.",
  APPLY_CHANGES_ERROR: "Failed to apply changes. Please try again.",
  GEMINI_API_ERROR: "Failed to analyze with AI. Please try again.",
} as const;

export const GOOGLE_AI_STUDIO_URL: string =
  "https://aistudio.google.com/apikey";
// export const MESSAGE_TYPES = {
//   PR_ANALYSIS_COMPLETE: "PR_ANALYSIS_COMPLETE",
//   ANALYZE_PR: "ANALYZE_PR",
// } as const;
