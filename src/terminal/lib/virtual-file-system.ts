import type { FSDirectoryNode, FSNode } from "../types/virtual-file-system";
import { TERMINAL_MESSAGES } from "./terminal-messages";

export const getFSNode = (fsRoot: FSDirectoryNode, path: string[]) => {
  const absolutePath = [...path];

  let currentNode: FSNode = fsRoot;

  for (const part of absolutePath) {
    if (currentNode.type === "file") {
      throw new Error("Invalid path");
    }

    const node: FSNode | undefined = currentNode.children.find(
      (node) => node.name === part,
    );

    if (!node) {
      throw new Error(TERMINAL_MESSAGES.INVALID_PATH);
    }

    currentNode = node;
  }

  return currentNode;
};

export const createVirtualFileSystem = (nodes: FSNode[]) => {
  const root: FSDirectoryNode = {
    name: "root",
    type: "directory",
    children: nodes,
  };

  return root;
};
