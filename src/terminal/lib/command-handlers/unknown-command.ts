import type { TerminalContent } from "../../types/terminal-content";
import { TERMINAL_MESSAGES } from "../terminal-messages";

export const getUnknownCommandOutput = (): TerminalContent[] => {
  return [
    {
      type: "text-command-output",
      output: TERMINAL_MESSAGES.UNKNOWN_COMMAND,
    },
  ];
};
