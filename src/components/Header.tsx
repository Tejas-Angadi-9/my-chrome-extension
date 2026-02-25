import { LuBot } from "react-icons/lu";

export const Header = () => {
  return (
    <header className="border-b border-[var(--border)] pb-4">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-end)] text-sm font-bold text-white shadow-[0_0_16px_var(--accent-glow)]">
          <LuBot size={20} />
        </span>
        <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          AI PR Generator
        </h1>
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
        Generate clean PR titles & descriptions from your changes
      </p>
    </header>
  );
};
