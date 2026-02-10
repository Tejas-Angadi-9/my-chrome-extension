export const Header = () => {
  return (
    <header className="border-b border-[var(--border)] pb-4">
      <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
        AI PR Generator
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Generate clean PR titles & descriptions from your changes
      </p>
    </header>
  );
};
