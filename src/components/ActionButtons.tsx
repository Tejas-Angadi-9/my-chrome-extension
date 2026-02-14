import { useRef } from "react";
import { usePRStore } from "../store/prGenerator.store";
import { setupMessageListener } from "../utils/setupMessageListener";

export const ActionButtons = () => {
  const { isLoading, setLoading } = usePRStore();

  const handleGenerate = async () => {
    setLoading(true);
    const listenerSetup = useRef(false);

    try {
      if (!listenerSetup.current) {
        setupMessageListener();
        listenerSetup.current = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
