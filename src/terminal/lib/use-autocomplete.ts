import type { Dispatch, SetStateAction } from "react";
import { SUPPORTED_COMMANDS } from "./supported-commands";

type AutocompleteOptions = {
  currentCommand: string;
  setCurrentCommand: Dispatch<SetStateAction<string>>;
};

const isCommandAutocomplete = (command: string) => {
  return /^\w+$/.test(command);
};

export const useAutocomplete = ({
  currentCommand,
  setCurrentCommand,
}: AutocompleteOptions) => {
  const handleAutocomplete = () => {
    if (isCommandAutocomplete(currentCommand)) {
      const commandSuggestions = SUPPORTED_COMMANDS.filter((command) =>
        command.aliases.some((alias) => alias.startsWith(currentCommand)),
      );

      if (commandSuggestions.length === 1) {
        setCurrentCommand(commandSuggestions[0].aliases[0]);
      }
    }
  };

  return { handleAutocomplete };
};
