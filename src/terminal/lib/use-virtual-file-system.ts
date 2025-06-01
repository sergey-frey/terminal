import { getPathParts, resolvePath } from "@/shared/utils";
import { useState } from "react";
import type { FSDirectoryNode } from "../types/virtual-file-system";
import { getFSNode } from "./virtual-file-system";

export const useVirtualFileSystem = (fsRoot: FSDirectoryNode) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<FSDirectoryNode>(fsRoot);

  const changeDirectory = (relativePath: string) => {
    const relativePathParts = getPathParts(relativePath);

    const newPath = resolvePath(currentPath, relativePathParts);

    const currentNode = getFSNode(fsRoot, newPath);

    if (currentNode.type === "file") {
      throw new Error("Path is not a directory");
    }

    setCurrentPath(newPath);
    setCurrentNode(currentNode);
  };

  const listDirectory = () => {
    return currentNode.children.map((child) => {
      return child.name;
    });
  };

  return {
    fs: fsRoot,
    currentPath,
    currentNode,
    changeDirectory,
    listDirectory,
  };
};
