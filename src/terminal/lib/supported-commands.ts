import type { SupportedCommand } from "../types/supported-commands";

export const SUPPORTED_COMMANDS: SupportedCommand[] = [
  {
    command: "clear",
    aliases: ["clear", "cls"],
    description: "Clear the terminal",
  },
  {
    command: "echo",
    aliases: ["echo"],
    description: "Print a message to the terminal",
  },
  {
    command: "help",
    aliases: ["help"],
    description: "Show the help menu",
  },
  {
    command: "ls",
    aliases: ["ls"],
    description: "List the contents of the current directory",
  },
  {
    command: "cd",
    aliases: ["cd"],
    description: "Change the current directory",
  },
  {
    command: "start",
    aliases: ["start"],
    description: "Start a file",
  },
];
