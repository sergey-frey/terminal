import { cn } from "tailwind-cn";
import type { TerminalContent } from "../types/terminal-content";
import { Command } from "./command";
import { TerminalLetters } from "./terminal-letters";

type TerminalContentViewProps = {
  content: TerminalContent;
  cursorPosition: number;
};

export const TerminalContentView = ({
  content,
  cursorPosition,
}: TerminalContentViewProps) => {
  if (content.type === "command") {
    return (
      <Command
        command={content.command}
        isCurrent={content.isCurrent}
        cursorPosition={cursorPosition}
        currentPath={content.path}
      />
    );
  }

  if (content.type === "text-command-output") {
    return (
      <span className={cn("text-gray-400", "contents")}>
        <TerminalLetters letters={content.output} />
      </span>
    );
  }

  if (content.type === "text-command-error") {
    return (
      <span className={cn("text-red-700", "contents")}>
        <TerminalLetters letters={content.error} />
      </span>
    );
  }
};
