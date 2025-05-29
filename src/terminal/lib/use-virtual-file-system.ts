import { getPathParts } from "@/shared/utils";
import { useState } from "react";
import type { FSDirectoryNode } from "../types/virtual-file-system";
import { getFSNode } from "./virtual-file-system";

export const useVirtualFileSystem = (fsRoot: FSDirectoryNode) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const changeDirectory = (relativePath: string) => {
    const newPath = [...currentPath];
    const relativePathParts = getPathParts(relativePath);

    for (const part of relativePathParts) {
      if (part === "..") {
        newPath.pop();
      } else {
        newPath.push(part);
      }

      const currentNode = getFSNode(fsRoot, newPath);

      if (currentNode.type === "file") {
        throw new Error("Path is not a directory");
      }
    }

    setCurrentPath(newPath);
  };

  const listDirectory = () => {
    const currentNode = getFSNode(fsRoot, currentPath);

    if (!currentNode) {
      throw new Error("Invalid path");
    }

    if (currentNode.type === "file") {
      throw new Error("Invalid path");
    }

    return currentNode.children.map((child) => {
      return child.name;
    });
  };

  return { fs: fsRoot, currentPath, changeDirectory, listDirectory };
};
