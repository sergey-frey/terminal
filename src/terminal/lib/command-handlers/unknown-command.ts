import type { TerminalContent } from "../../types/terminal-content";

export const getUnknownCommandOutput = (): TerminalContent[] => {
  return [
    {
      type: "text-command-output",
      output: "Unknown command (use 'help' command)",
    },
  ];
};
