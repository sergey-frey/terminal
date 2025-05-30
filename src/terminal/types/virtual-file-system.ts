type TextFileData = {
  file_type: "text";
  payload: {
    content: string;
  };
};

type ImageFileData = {
  file_type: "image";
  payload: {
    src: string;
  };
};

export type FSFileNode = {
  name: string;
  type: "file";
} & (TextFileData | ImageFileData);

export type FSDirectoryNode = {
  name: string;
  type: "directory";
  children: FSNode[];
};

export type FSNode = FSFileNode | FSDirectoryNode;
