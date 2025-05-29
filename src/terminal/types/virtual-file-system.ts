export type FSFileNode = {
  name: string;
  type: "file";
};

export type FSDirectoryNode = {
  name: string;
  type: "directory";
  children: FSNode[];
};

export type FSNode = FSFileNode | FSDirectoryNode;
