import { joinPath } from "@/shared/utils";
import type { TerminalContent } from "../../types/terminal-content";
import { TERMINAL_MESSAGES } from "../terminal-messages";

export const getCdCommandOutput = (
  command: string,
  changeDirectory: (path: string) => void,
): TerminalContent[] => {
  const args = command.split(" ").slice(1);

  if (args.length === 0) {
    return [
      {
        type: "text-command-error",
        error: TERMINAL_MESSAGES.NO_ARGUMENTS_PROVIDED,
      },
    ];
  }

  try {
    changeDirectory(joinPath(...args));
  } catch (error) {
    if (error instanceof Error) {
      return [{ type: "text-command-error", error: error.message }];
    }

    return [
      {
        type: "text-command-error",
        error: TERMINAL_MESSAGES.UNKNOWN_ERROR,
      },
    ];
  }

  return [];
};
