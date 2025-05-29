import { createVirtualFileSystem, Terminal } from "@/terminal";
import { cn } from "tailwind-cn";

import "./global.css";

const virtualFileSystem = createVirtualFileSystem([
  {
    name: "Temp",
    type: "directory",
    children: [
      {
        name: "notes.txt",
        type: "file",
      },
      {
        name: "funny_cat.png",
        type: "file",
      },
      {
        name: "Torrents",
        type: "directory",
        children: [
          {
            name: "resident_evil_4.torrent",
            type: "file",
          },
        ],
      },
    ],
  },
]);

export function App() {
  return (
    <>
      <div className={cn("grid place-items-center h-screen")}>
        <Terminal fsRoot={virtualFileSystem} />
      </div>
    </>
  );
}
