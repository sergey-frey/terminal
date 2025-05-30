import type { TerminalContent } from "../../types/terminal-content";

export const getLsCommandOutput = (
  listDirectory: () => string[],
): TerminalContent[] => {
  const contents = listDirectory();

  if (contents.length === 0) {
    return [{ type: "text-command-output", output: "No contents" }];
  }

  return contents.map<TerminalContent>((content) => ({
    type: "text-command-output",
    output: content,
  }));
};
