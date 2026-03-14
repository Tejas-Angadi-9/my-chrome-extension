import { LuBot } from "react-icons/lu";
import useApiKeyStore from "../store/apiKey.store";

export const Header = () => {
  const { setApiKey } = useApiKeyStore();
  return (
    <header className="flex flex-col border-b border-[var(--border)] pb-5 gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-end)] text-sm font-bold text-white shadow-[0_0_16px_var(--accent-glow)]">
            <LuBot size={20} />
          </span>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            AI PR Generator
          </h1>
        </div>
        <button
          className="text-xs font-medium text-[var(--accent)] hover:text-white transition-colors duration-150 focus:outline-none cursor-pointer"
          onClick={() => setApiKey(null)}>
          <p>Change API Key</p>
        </button>
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
        Generate clean PR titles & descriptions from your changes
      </p>
    </header>
  );
};
