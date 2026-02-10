import { usePRStore } from "../store/prGenerator.store";

export const ResultSection = () => {
  const { titleResult, descriptionResult } = usePRStore();

  if (!titleResult && !descriptionResult) return null;

  return (
    <div className="mt-2 space-y-4 border-t border-[var(--border)] pt-4">
      {titleResult && (
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Title
          </p>
          <div className="rounded-[var(--radius-sm)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)]">
            {titleResult}
          </div>
        </div>
      )}

      {descriptionResult && (
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
            Description
          </p>
          <div className="whitespace-pre-wrap rounded-[var(--radius-sm)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)]">
            {descriptionResult}
          </div>
        </div>
      )}
    </div>
  );
};
