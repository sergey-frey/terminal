import type { Dispatch, SetStateAction } from "react";
import type { TerminalContent } from "../types/terminal-content";
import type { FSDirectoryNode } from "../types/virtual-file-system";
import { getCdCommandOutput } from "./command-handlers/cd";
import { getEchoCommandOutput } from "./command-handlers/echo";
import { getHelpCommandOutput } from "./command-handlers/help";
import { getLsCommandOutput } from "./command-handlers/ls";
import { getStartCommandOutput } from "./command-handlers/start";
import { getUnknownCommandOutput } from "./command-handlers/unknown-command";

type UseExecuteCommandOptions = {
  setTerminalContent: Dispatch<SetStateAction<TerminalContent[]>>;
  listDirectory: () => string[];
  changeDirectory: (path: string) => void;
  currentPath: string[];
  fsRoot: FSDirectoryNode;
};

export const useExecuteCommand = ({
  setTerminalContent,
  listDirectory,
  changeDirectory,
  currentPath,
  fsRoot,
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

    if (/^echo([ ])?/.test(command)) {
      return handleCommand(getEchoCommandOutput(command));
    }

    if (/^start([ ])?/.test(command)) {
      return handleCommand(
        getStartCommandOutput({ command, fsRoot, currentPath }),
      );
    }

    if (/^help$/.test(command)) {
      return handleCommand(getHelpCommandOutput());
    }

    if (/^ls$/.test(command)) {
      return handleCommand(getLsCommandOutput(listDirectory));
    }

    if (/^cd([ ])?/.test(command)) {
      return handleCommand(getCdCommandOutput(command, changeDirectory));
    }

    return handleCommand(getUnknownCommandOutput());
  };

  return { commandsReducer };
};
