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
  SELECT_TITLE_OR_DESCRIPTION: "Select at least title or description",
  API_KEY_MISSING: "API key is missing. Please enter your API key.",
  INVALID_API_KEY: "Invalid API key. Please update your API key.",
  RATE_LIMIT_EXCEEDED:
    "Rate limit exceeded. Please try again later or upgrade your plan.",
  MISSING_API_KEY: "Missing or invalid Gemini API key. Check your .env file.",
} as const;

export const TOAST_MESSAGES = {
  PR_PASTE_SUCCESS: "PR details pasted successfully!",
} as const;

export const MESSAGE_TYPES = {
  ANALYZE_PR: "ANALYZE_PR",
  APPLY_CHANGES: "APPLY_CHANGES",
  RUN_PR_EXTRACTION: "RUN_PR_EXTRACTION",
  PR_ANALYSIS_COMPLETE: "PR_ANALYSIS_COMPLETE",
  PR_ANALYSIS_FAILED: "PR_ANALYSIS_FAILED",
} as const;

export const GOOGLE_AI_STUDIO_URL: string =
  "https://aistudio.google.com/apikey";
