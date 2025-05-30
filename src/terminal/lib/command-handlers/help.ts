import type { TerminalContent } from "../../types/terminal-content";
import { SUPPORTED_COMMANDS } from "../supported-commands";

export const getHelpCommandOutput = (): TerminalContent[] => {
  const commandDescriptions: TerminalContent[] = [];

  for (const command of SUPPORTED_COMMANDS) {
    const content = `${command.command} (${command.aliases.join("/")}) - ${command.description}`;

    commandDescriptions.push({
      type: "text-command-output",
      output: content,
    });
  }

  return commandDescriptions;
};
