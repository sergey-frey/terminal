import type { TerminalContent } from "../../types/terminal-content";
import { TERMINAL_MESSAGES } from "../terminal-messages";

export const getLsCommandOutput = (
  listDirectory: () => string[],
): TerminalContent[] => {
  const contents = listDirectory();

  if (contents.length === 0) {
    return [
      { type: "text-command-output", output: TERMINAL_MESSAGES.NO_CONTENTS },
    ];
  }

  return contents.map<TerminalContent>((content) => ({
    type: "text-command-output",
    output: content,
  }));
};
