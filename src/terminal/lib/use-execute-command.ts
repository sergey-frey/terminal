import type { Dispatch, SetStateAction } from "react";
import type { TerminalContent } from "../types/terminal-content";
import { SUPPORTED_COMMANDS } from "./supported-commands";

type UseExecuteCommandOptions = {
  setTerminalContent: Dispatch<SetStateAction<TerminalContent[]>>;
  listDirectory: () => string[];
  changeDirectory: (path: string) => void;
};

export const useExecuteCommand = ({
  setTerminalContent,
  listDirectory,
  changeDirectory,
}: UseExecuteCommandOptions) => {
  const handleClearCommand = () => {
    setTerminalContent([]);
  };

  const handleEchoCommand = (command: string) => {
    const args = command.split(" ").slice(1);

    setTerminalContent((prev) => [
      ...prev,
      ...args.map<TerminalContent>((arg) => ({
        type: "text-command-output",
        output: arg,
      })),
    ]);
  };

  const handleUnknownCommand = () => {
    setTerminalContent((prev) => [
      ...prev,
      {
        type: "text-command-output",
        output: "Unknown command (use 'help' command)",
      },
    ]);
  };

  const handleHelpCommand = () => {
    for (const command of SUPPORTED_COMMANDS) {
      const content = `${command.command} (${command.aliases.join("/")}) - ${command.description}`;

      setTerminalContent((prev) => [
        ...prev,
        { type: "text-command-output", output: content },
      ]);
    }
  };

  const handleLsCommand = () => {
    const contents = listDirectory();

    if (contents.length === 0) {
      return setTerminalContent((prev) => [
        ...prev,
        { type: "text-command-output", output: "No contents" },
      ]);
    }

    setTerminalContent((prev) => [
      ...prev,
      ...contents.map<TerminalContent>((content) => ({
        type: "text-command-output",
        output: content,
      })),
    ]);
  };

  const handleCdCommand = (command: string) => {
    const args = command.split(" ").slice(1);

    if (args.length === 0) {
      setTerminalContent((prev) => [
        ...prev,
        {
          type: "text-command-error",
          error: "No arguments provided",
        },
      ]);
    } else {
      try {
        changeDirectory(args.join("/"));
      } catch (error) {
        if (error instanceof Error) {
          setTerminalContent((prev) => [
            ...prev,
            { type: "text-command-error", error: error.message },
          ]);
        } else {
          setTerminalContent((prev) => [
            ...prev,
            { type: "text-command-error", error: "Unknown error" },
          ]);
        }
      }
    }
  };
  const commandsReducer = (command: string) => {
    if (/^(cls|clear)$/.test(command)) {
      return handleClearCommand;
    }

    if (/^echo/.test(command)) {
      return handleEchoCommand.bind(null, command);
    }

    if (/^help$/.test(command)) {
      return handleHelpCommand;
    }

    if (/^ls$/.test(command)) {
      return handleLsCommand;
    }

    if (/^cd/.test(command)) {
      return handleCdCommand.bind(null, command);
    }

    return handleUnknownCommand;
  };

  return { commandsReducer };
};
