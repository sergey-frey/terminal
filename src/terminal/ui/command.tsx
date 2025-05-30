import { joinPath } from "@/shared/utils";
import { TerminalLetters } from "./terminal-letters";

interface CommandProps {
  command: string;
  isCurrent: boolean;
  cursorPosition: number;
  currentPath: string[];
}

export const Command = ({
  command,
  isCurrent,
  cursorPosition,
  currentPath,
}: CommandProps) => {
  const needToShowEndCursor = command.length === cursorPosition && isCurrent;
  const isRoot = currentPath.length === 0;

  console.log(needToShowEndCursor, cursorPosition, isCurrent, command);

  return (
    <>
      <span>
        ubuntu@user:
        <span className="contents text-cyan-500">
          ~{isRoot ? "" : "/"}
          {joinPath(...currentPath)}
        </span>
        $&nbsp;
      </span>
      <TerminalLetters
        letters={command}
        cursorPosition={cursorPosition}
        isCurrent={isCurrent}
      />
      {needToShowEndCursor && (
        <span key={cursorPosition} className="bg-gray-500 cursor">
          &nbsp;
        </span>
      )}
    </>
  );
};
