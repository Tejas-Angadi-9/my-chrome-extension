import { usePRStore } from "../store/prGenerator.store";

export const ResultSection = () => {
  const { titleResult, descriptionResult } = usePRStore();

  if (!titleResult && !descriptionResult) return null;

  return (
    <div className="mt-6 space-y-4 text-black">
      {titleResult && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Title</p>
          <div className="rounded-lg bg-gray-100 p-2 text-sm">
            {titleResult}
          </div>
        </div>
      )}

      {descriptionResult && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Description</p>
          <div className="rounded-lg bg-gray-100 p-2 text-sm whitespace-pre-wrap">
            {descriptionResult}
          </div>
        </div>
      )}
    </div>
  );
};
