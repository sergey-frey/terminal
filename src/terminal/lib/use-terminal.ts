import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { TerminalContent } from "../types/terminal-content";
import type { FSDirectoryNode } from "../types/virtual-file-system";
import { useAutocomplete } from "./use-autocomplete";
import { useExecuteCommand } from "./use-execute-command";
import { useVirtualFileSystem } from "./use-virtual-file-system";

type UseTerminalOptions = {
  fsRoot: FSDirectoryNode;
  onSubmit: (command: string) => void;
};

export const useTerminal = ({ fsRoot, onSubmit }: UseTerminalOptions) => {
  const [currentCommand, setCurrentCommand] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [commandsHistory, setCommandsHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(0);
  const [cachedCurrentCommand, setCachedCurrentCommand] = useState("");
  const [terminalContent, setTerminalContent] = useState<TerminalContent[]>([]);

  const { currentPath, listDirectory, changeDirectory } =
    useVirtualFileSystem(fsRoot);

  const { handleAutocomplete } = useAutocomplete({
    currentCommand,
    setCurrentCommand,
  });

  const { commandsReducer } = useExecuteCommand({
    setTerminalContent,
    listDirectory,
    changeDirectory,
    currentPath,
    fsRoot,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCursorPosition(e.target.selectionStart || 0);
    setCurrentCommand(e.target.value);
    setCachedCurrentCommand(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentCommand?.trim()) {
      return;
    }

    setCommandsHistory((prev) => [...prev, currentCommand]);
    setTerminalContent((prev) => [
      ...prev,
      {
        type: "command",
        command: currentCommand,
        isCurrent: false,
        path: currentPath,
      },
    ]);
    setCurrentCommand("");
    setCursorPosition(0);
    setHistoryPointer(commandsHistory.length + 1);

    commandsReducer(currentCommand.trim())();

    onSubmit(currentCommand);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleAutocomplete();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      const previousHistoryPointer = Math.max(historyPointer - 1, 0);

      setHistoryPointer(previousHistoryPointer);

      if (previousHistoryPointer < commandsHistory.length) {
        setCurrentCommand(commandsHistory[previousHistoryPointer]);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      const nextHistoryPointer = Math.min(
        historyPointer + 1,
        commandsHistory.length,
      );

      if (nextHistoryPointer === commandsHistory.length) {
        setCurrentCommand(cachedCurrentCommand);
      } else {
        setCurrentCommand(commandsHistory[nextHistoryPointer]);
      }
      setHistoryPointer(nextHistoryPointer);
    }

    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  return {
    currentCommand,
    cursorPosition,
    commandsHistory,
    terminalContent,
    currentPath,
    handleInputChange,
    handleSubmit,
    handleKeyDown,
    handleKeyUp,
    handleClick,
  };
};
