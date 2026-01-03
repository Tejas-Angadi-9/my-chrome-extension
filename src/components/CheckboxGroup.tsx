import { usePRStore } from "../store/prGenerator.store";

export const CheckboxGroup = () => {
  const {
    generateTitle,
    generateDescription,
    setGenerateTitle,
    setGenerateDescription,
  } = usePRStore();

  return (
    <div className="flex gap-4 mb-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={generateTitle}
          onChange={(event) => setGenerateTitle(event.target.checked)}
        />
        Title
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={generateDescription}
          onChange={(event) => setGenerateDescription(event.target.checked)}
        />
        Description
      </label>
    </div>
  );
};
