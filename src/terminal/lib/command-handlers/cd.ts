import type { TerminalContent } from "../../types/terminal-content";

export const getCdCommandOutput = (
  command: string,
  changeDirectory: (path: string) => void,
): TerminalContent[] => {
  const args = command.split(" ").slice(1);

  if (args.length === 0) {
    return [{ type: "text-command-error", error: "No arguments provided" }];
  }

  try {
    changeDirectory(args.join("/"));
  } catch (error) {
    if (error instanceof Error) {
      return [{ type: "text-command-error", error: error.message }];
    }

    return [{ type: "text-command-error", error: "Unknown error" }];
  }

  return [];
};
