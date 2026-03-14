import { LuBot, LuEye, LuEyeOff, LuExternalLink } from "react-icons/lu";
import { GOOGLE_AI_STUDIO_URL } from "../shared/constants";
import { useState } from "react";
import { saveApiKey } from "../utils/chromeStorage";

const OnboardingScreen = () => {
  const [isApiKeyVisible, setIsApiKeyVisible] = useState<boolean>(false);
  const [apiKeyValue, setApiKeyValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-5 p-5 w-full max-w-[var(--popup-width)]">
      <div className="border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-end)] text-sm font-bold text-white shadow-[0_0_16px_var(--accent-glow)]">
            <LuBot size={20} />
          </span>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            AI PR Assistant
          </h1>
        </div>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          Connect your Gemini API key to get started generating PR titles and
          descriptions.
        </p>
      </div>

      <div className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          How to get your API key
        </p>
        <ol className="flex flex-col gap-2">
          <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[10px] font-bold text-[var(--accent)]">
              1
            </span>
            <span>
              Open{" "}
              <a
                href={GOOGLE_AI_STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-[var(--accent)] underline-offset-2 hover:underline">
                Google AI Studio
                <LuExternalLink size={11} />
              </a>
            </span>
          </li>
          <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[10px] font-bold text-[var(--accent)]">
              2
            </span>
            <span>Click "Get API key" and create or copy a key</span>
          </li>
          <li className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-[10px] font-bold text-[var(--accent)]">
              3
            </span>
            <span>Paste it below and click Proceed</span>
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="api-key-input"
          className="text-xs font-medium text-[var(--text-secondary)]">
          Gemini API Key
        </label>
        <div className="relative">
          <input
            id="api-key-input"
            value={apiKeyValue}
            type={isApiKeyVisible ? "text" : "password"}
            placeholder="Enter your key..."
            onChange={(event) => setApiKeyValue(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            className={`w-full rounded-[var(--radius-sm)] border bg-[var(--bg-elevated)] px-3 py-2.5 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--border-focus)] border-[var(--border)]`}
          />
          <button
            type="button"
            onClick={() => setIsApiKeyVisible((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer">
            {isApiKeyVisible ? <LuEye size={15} /> : <LuEyeOff size={15} />}
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          saveApiKey(apiKeyValue);
        }}
        className="relative w-full overflow-hidden rounded-[var(--radius)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-end)] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition-all duration-200 hover:shadow-[0_0_28px_var(--accent-glow)] cursor-pointer">
        <span className="relative z-10 flex items-center justify-center gap-2">
          Proceed
        </span>
      </button>
    </div>
  );
};

export default OnboardingScreen;
