import type { TerminalContent } from "../../types/terminal-content";

export const getEchoCommandOutput = (command: string): TerminalContent[] => {
  const args = command.split(" ").slice(1);

  return args.map<TerminalContent>((arg) => ({
    type: "text-command-output",
    output: arg,
  }));
};
