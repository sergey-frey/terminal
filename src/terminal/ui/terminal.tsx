import { useRef } from "react";
import { cn } from "tailwind-cn";
import { useTerminal } from "../lib/use-terminal";
import type { FSDirectoryNode } from "../types/virtual-file-system";
import { TerminalContentView } from "./terminal-content-view";

import "../styles/cursor.css";

type TerminalProps = {
  fsRoot: FSDirectoryNode;
};

export const Terminal = ({ fsRoot }: TerminalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const {
    currentCommand,
    cursorPosition,
    terminalContent,
    currentPath,
    handleInputChange,
    handleSubmit,
    handleKeyDown,
    handleKeyUp,
    handleClick,
  } = useTerminal({
    fsRoot,
    onSubmit: () => {
      setTimeout(() => {
        if (!terminalRef.current) {
          return;
        }

        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, 0);
    },
  });

  const terminalContentWithCurrentCommand = terminalContent.concat({
    type: "command",
    command: currentCommand,
    isCurrent: true,
    path: currentPath,
  });

  const handleFocusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="opacity-0 pointer-events-none -z-10 fixed top-0 left-0"
      >
        <input
          type="text"
          value={currentCommand}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
        />
      </form>
      <article
        className={cn(
          "bg-gray-900 rounded-lg",
          "text-gray-50 font-mono",
          "w-full max-w-200 h-120",
          "shadow-lg shadow-gray-900/50",
          "overflow-y-auto scroll-smooth",
        )}
        ref={terminalRef}
        onClick={handleFocusTerminal}
      >
        <div className="p-4">
          {terminalContentWithCurrentCommand.map((content, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "overflow-hidden whitespace-pre-line break-words contents",
                  "flex flex-wrap",
                )}
              >
                <TerminalContentView
                  content={content}
                  cursorPosition={cursorPosition}
                />
              </div>
            );
          })}
        </div>
      </article>
    </>
  );
};
