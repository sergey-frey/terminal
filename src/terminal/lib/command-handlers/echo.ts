import type { TerminalContent } from "../../types/terminal-content";
import { TERMINAL_MESSAGES } from "../terminal-messages";

export const getEchoCommandOutput = (command: string): TerminalContent[] => {
  const args = command.split(" ").slice(1);

  if (args.length === 0) {
    return [
      {
        type: "text-command-error",
        error: TERMINAL_MESSAGES.NO_ARGUMENTS_PROVIDED,
      },
    ];
  }

  return args.map<TerminalContent>((arg) => ({
    type: "text-command-output",
    output: arg,
  }));
};
