import { getPathParts, joinPath, resolvePath } from "@/shared/utils/path";
import type { Dispatch, SetStateAction } from "react";
import type { FSDirectoryNode } from "../types/virtual-file-system";
import { SUPPORTED_COMMANDS } from "./supported-commands";
import { getFSNode } from "./virtual-file-system";

type AutocompleteOptions = {
  fsRoot: FSDirectoryNode;
  currentCommand: string;
  currentPath: string[];
  setCurrentCommand: Dispatch<SetStateAction<string>>;
};

const isCommandAutocomplete = (command: string) => {
  return /^\w+$/.test(command);
};

const isPathAutocomplete = (command: string) => {
  return /^(\w+|(\.){1,2}|\/)+(\/\w+)*\/?$/.test(command);
};

export const useAutocomplete = ({
  fsRoot,
  currentCommand,
  currentPath,
  setCurrentCommand,
}: AutocompleteOptions) => {
  const handleAutocomplete = () => {
    if (isCommandAutocomplete(currentCommand)) {
      const commandSuggestions = SUPPORTED_COMMANDS.filter((command) =>
        command.aliases.some((alias) => alias.startsWith(currentCommand)),
      );

      if (commandSuggestions.length === 1) {
        return setCurrentCommand(commandSuggestions[0].aliases[0]);
      }
    }

    const commandParts = currentCommand.split(" ");
    const staticCommandParts = commandParts.slice(0, -1);
    const lastCommandPart = commandParts[commandParts.length - 1];

    if (isPathAutocomplete(lastCommandPart)) {
      const pathParts = getPathParts(lastCommandPart);
      const staticPathParts = pathParts.slice(0, -1);
      const lastDynamicPathPart = pathParts[pathParts.length - 1];

      const completionPath = resolvePath(currentPath, staticPathParts);

      try {
        const completionNode = getFSNode(fsRoot, completionPath);

        if (completionNode.type === "file") {
          return;
        }

        const pathSuggestions = completionNode.children.filter((child) =>
          child.name.startsWith(lastDynamicPathPart),
        );

        if (pathSuggestions.length === 1) {
          return setCurrentCommand(
            [
              ...staticCommandParts,
              joinPath(...staticPathParts.concat(pathSuggestions[0].name)),
            ].join(" "),
          );
        }
      } catch {}
    }
  };

  return { handleAutocomplete };
};
