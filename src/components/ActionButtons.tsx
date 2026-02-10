import { usePRStore } from "../store/prGenerator.store";
import { mockGenerate } from "../utils/mockGenerate";

export const ActionButtons = () => {
  const {
    generateTitle,
    generateDescription,
    setResults,
    isLoading,
    setLoading,
  } = usePRStore();

  const handleGenerate = async () => {
    setLoading(true);

    const { title, description } = await mockGenerate({
      generateTitle,
      generateDescription,
    });

    setResults(title, description);
    setLoading(false);
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isLoading}
      className="w-full rounded-[var(--radius)] bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--bg-primary)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[var(--accent)]">
      {isLoading ? "Generating..." : "Generate"}
    </button>
  );
};
