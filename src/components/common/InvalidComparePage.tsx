import { LuGithub } from "react-icons/lu";

const InvalidComparePage = () => {
  return (
    <div className="flex min-h-[var(--popup-min-height)] flex-col items-center justify-center gap-5 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-end)]/10 ring-1 ring-[var(--border)]">
        <LuGithub size={30} className="text-[var(--accent)]" />
      </div>
      <div className="space-y-1.5">
        <p className="text-base font-semibold text-[var(--text-primary)]">
          Navigate to a compare page
        </p>
        <p className="max-w-[240px] text-sm leading-relaxed text-[var(--text-secondary)]">
          Open a GitHub compare page to generate PR titles and descriptions from
          your changes
        </p>
      </div>
      <div className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
        <span className="text-[var(--accent)]">github.com</span>
        <span>/owner/repo/compare/base...head</span>
      </div>
    </div>
  );
};

export default InvalidComparePage;
