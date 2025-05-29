export type CommandContent = {
  type: "command";
  command: string;
  isCurrent: boolean;
  path: string[];
};

export type TextCommandOutputContent = {
  type: "text-command-output";
  output: string;
};

export type TextCommandErrorContent = {
  type: "text-command-error";
  error: string;
};

export type TerminalContent =
  | CommandContent
  | TextCommandOutputContent
  | TextCommandErrorContent;
