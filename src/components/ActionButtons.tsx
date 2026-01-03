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
      className="w-full mt-4 rounded-lg bg-black text-white py-2 text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer">
      {isLoading ? "Generating..." : "Generate"}
    </button>
  );
};
