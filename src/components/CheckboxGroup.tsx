import { usePRStore } from "../store/prGenerator.store";

export const CheckboxGroup = () => {
  const {
    generateTitle,
    generateDescription,
    setGenerateTitle,
    setGenerateDescription,
  } = usePRStore();

  return (
    <div className="flex gap-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-card)] p-3 backdrop-blur-sm">
      <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-primary)] transition-opacity hover:opacity-90">
        <input
          type="checkbox"
          checked={generateTitle}
          onChange={(event) => setGenerateTitle(event.target.checked)}
        />
        <span className="font-medium">Title</span>
      </label>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--text-primary)] transition-opacity hover:opacity-90">
        <input
          type="checkbox"
          checked={generateDescription}
          onChange={(event) => setGenerateDescription(event.target.checked)}
        />
        <span className="font-medium">Description</span>
      </label>
    </div>
  );
};
