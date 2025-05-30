import type { Dispatch, SetStateAction } from "react";
import type { TerminalContent } from "../types/terminal-content";
import { getCdCommandOutput } from "./command-handlers/cd";
import { getEchoCommandOutput } from "./command-handlers/echo";
import { getHelpCommandOutput } from "./command-handlers/help";
import { getLsCommandOutput } from "./command-handlers/ls";
import { getUnknownCommandOutput } from "./command-handlers/unknown-command";

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

  const handleCommand = (outputs: TerminalContent[]) => {
    return () => {
      setTerminalContent((prev) => [...prev, ...outputs]);
    };
  };

  const commandsReducer = (command: string) => {
    if (/^(cls|clear)$/.test(command)) {
      return handleClearCommand;
    }

    if (/^echo/.test(command)) {
      return handleCommand(getEchoCommandOutput(command));
    }

    if (/^help$/.test(command)) {
      return handleCommand(getHelpCommandOutput());
    }

    if (/^ls$/.test(command)) {
      return handleCommand(getLsCommandOutput(listDirectory));
    }

    if (/^cd/.test(command)) {
      return handleCommand(getCdCommandOutput(command, changeDirectory));
    }

    return () => {
      setTerminalContent((prev) => [...prev, ...getUnknownCommandOutput()]);
    };
  };

  return { commandsReducer };
};
