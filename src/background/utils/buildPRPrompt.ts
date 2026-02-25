import type { PRExtractedData } from "../../shared/types";

export function buildPRPrompt(data: PRExtractedData): string {
  return `
You are a senior software engineer.

Generate:
1. A concise GitHub Pull Request title
2. A clear PR description in markdown
3. Keep the description short and in points

Context:
- Base branch: ${data.branches.base}
- Compare branch: ${data.branches.compare}

Commit messages:
${data.commitHints.map((c) => `- ${c}`).join("\n")}

Files changed:
${data.filesNames.map((f) => `- ${f}`).join("\n")}


Guidelines:
- Title should be under 72 characters
- Description should have Summary, Changes, and Notes sections
- Be professional and clear
`;
}
