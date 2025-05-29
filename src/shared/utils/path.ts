export const joinPath = (...paths: string[]) => {
  return paths.join("/").replace(/\/\//g, "/");
};

export const getPathParts = (path: string) => {
  return path.split("/").filter((part) => Boolean(part) && part !== ".");
};
