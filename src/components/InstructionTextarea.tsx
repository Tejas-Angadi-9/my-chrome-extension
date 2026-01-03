import { usePRStore } from "../store/prGenerator.store";

export const InstructionTextarea = () => {
  const { instructions, setInstructions } = usePRStore();

  return (
    <textarea
      value={instructions}
      onChange={(event) => setInstructions(event.target.value)}
      placeholder="Optional instructions (e.g. keep it concise, use bullet points)..."
      className="w-full min-h-20 rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
    />
  );
};
