import { getPathParts, joinPath, resolvePath } from "@/shared/utils";
import type { TerminalContent } from "../../types/terminal-content";
import type {
  FSDirectoryNode,
  FSFileNode,
} from "../../types/virtual-file-system";
import { TERMINAL_MESSAGES } from "../terminal-messages";
import { getFSNode } from "../virtual-file-system";

type GetStartCommandOutputOptions = {
  command: string;
  fsRoot: FSDirectoryNode;
  currentPath: string[];
};

const handleTextFile = (currentNode: FSFileNode): TerminalContent[] => {
  const { name, file_type, payload } = currentNode;

  if (file_type !== "text") {
    return [];
  }

  return [
    { type: "text-command-output", output: `content of ${name}` },
    { type: "text-command-output", output: payload.content },
  ];
};

const handleImageFile = (currentNode: FSFileNode): TerminalContent[] => {
  const { file_type, payload } = currentNode;

  if (file_type !== "image") {
    return [];
  }

  window.open(payload.src, "_blank");

  return [
    {
      type: "text-command-output",
      output: `Opened ${currentNode.name}`,
    },
  ];
};

export const getStartCommandOutput = ({
  command,
  fsRoot,
  currentPath,
}: GetStartCommandOutputOptions): TerminalContent[] => {
  const args = command.split(" ").slice(1);

  if (args.length === 0) {
    return [
      {
        type: "text-command-error",
        error: TERMINAL_MESSAGES.NO_ARGUMENTS_PROVIDED,
      },
    ];
  }

  const pathParts = getPathParts(joinPath(...args));

  try {
    const currentNode = getFSNode(fsRoot, resolvePath(currentPath, pathParts));

    if (!currentNode) {
      return [
        { type: "text-command-error", error: TERMINAL_MESSAGES.INVALID_PATH },
      ];
    }

    if (currentNode.type === "directory") {
      return [{ type: "text-command-error", error: "Cannot start directory" }];
    }

    if (currentNode.file_type === "text") {
      return handleTextFile(currentNode);
    }

    if (currentNode.file_type === "image") {
      return handleImageFile(currentNode);
    }
  } catch (error) {
    if (error instanceof Error) {
      return [{ type: "text-command-error", error: error.message }];
    }

    return [
      { type: "text-command-error", error: TERMINAL_MESSAGES.UNKNOWN_ERROR },
    ];
  }

  return [];
};
