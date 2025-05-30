export const joinPath = (...paths: string[]) => {
  return paths.join("/").replace(/\/\//g, "/");
};

export const getPathParts = (path: string) => {
  return path.split("/").filter((part) => Boolean(part) && part !== ".");
};

export const resolvePath = (basePath: string[], relativePath: string[]) => {
  const newPath = [...basePath];

  for (const part of relativePath) {
    if (part === "..") {
      newPath.pop();
    } else {
      newPath.push(part);
    }
  }

  return newPath;
};
