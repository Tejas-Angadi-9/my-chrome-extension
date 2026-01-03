export const mockGenerate = async ({
  generateTitle,
  generateDescription,
}: {
  generateTitle: boolean;
  generateDescription: boolean;
}) => {
  return new Promise<{
    title: string;
    description: string;
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        title: generateTitle ? "Refactor auth flow and improve validation" : "",
        description: generateDescription
          ? "- Simplified login logic\n- Added input validation\n- Improved error handling"
          : "",
      });
    }, 800);
  });
};
