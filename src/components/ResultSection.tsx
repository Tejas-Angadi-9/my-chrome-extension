import { usePRStore } from "../store/prGenerator.store";

export const ResultSection = () => {
  const { titleResult, descriptionResult } = usePRStore();

  if (!titleResult && !descriptionResult) return null;

  return (
    <div className="mt-2 space-y-4 border-t border-[var(--border)] pt-4">
      {titleResult && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Title
          </p>
          <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-3 text-sm text-[var(--text-primary)] backdrop-blur-sm">
            {titleResult}
          </div>
        </div>
      )}

      {descriptionResult && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
            Description
          </p>
          <div className="whitespace-pre-wrap rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-3 text-sm leading-relaxed text-[var(--text-primary)] backdrop-blur-sm">
            {descriptionResult}
          </div>
        </div>
      )}
    </div>
  );
};
