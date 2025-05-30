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
        file_type: "text",
        payload: {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      },
      {
        name: "funny_cat.png",
        type: "file",
        file_type: "image",
        payload: {
          src: "https://lh5.googleusercontent.com/proxy/PwEmNHFI747oxDlSz8boJYuQcRdGq-5Lu3qzjw1T15a1BsyJlOtyvxPBZH_fSJbRMYcZi8_KJC4npXnHXG7PKNgATntlsV2tf8tazaO5HHK1hLUAFNrBZU-odqqjBWl2QiEPlvUFJaYzz5mMQqt5",
        },
      },
      {
        name: "Torrents",
        type: "directory",
        children: [
          {
            name: "resident_evil_4.torrent",
            type: "file",
            file_type: "text",
            payload: {
              content: "This is a torrent",
            },
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
