import { usePRStore } from "../store/prGenerator.store";

export const InstructionTextarea = () => {
  const { instructions, setInstructions } = usePRStore();

  const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(event.target.value)
  }

  return (
    <textarea
      value={instructions}
      onChange={textChangeHandler}
      placeholder="Optional instructions (e.g. keep it concise, use bullet points)..."
      rows={3}
      className="w-full resize-none rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
    />
  );
};
