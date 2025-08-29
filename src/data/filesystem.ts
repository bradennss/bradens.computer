import { normalizePath, splitPath } from "~/utils";

type BaseFilesystemItem = {
  path: string;
  type: unknown;
};

export type FilesystemDirectory = BaseFilesystemItem & {
  type: "directory";
};

export type FilesystemFile = BaseFilesystemItem & {
  type: "file";
  src: string;
};

export type FilesystemItem = FilesystemDirectory | FilesystemFile;

export function listDirectory(path: string): FilesystemItem[] {
  path = normalizePath(path);

  if (path === "/") {
    return filesystem.filter((item) => splitPath(item.path).length === 1);
  }
  const parentParts = splitPath(path);

  return filesystem.filter((item) => {
    const parts = splitPath(item.path);
    return (
      parts.length === parentParts.length + 1 &&
      parentParts.every((part, index) => parts[index] === part)
    );
  });
}

export function getFileOrDirectory(path: string): FilesystemItem | null {
  path = normalizePath(path);
  return filesystem.find((item) => item.path === path) ?? null;
}

const filesystem: FilesystemItem[] = [
  { type: "directory", path: "/test" },
  { type: "file", path: "/test/lorem-ipsum.txt", src: "/lorem-ipsum.txt" },
  {
    type: "file",
    path: "/test/markdown-syntax.md",
    src: "/markdown-syntax.md",
  },
  {
    type: "file",
    path: "/test/living-room.avif",
    src: "/living-room.avif",
  },
  {
    type: "file",
    path: "/test/living-room-zoomed.png",
    src: "/living-room-zoomed.png",
  },
  { type: "directory", path: "/1099" },
  { type: "directory", path: "/1099/2025" },
  {
    type: "file",
    path: "/1099/2025/comunal.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2025/diana-kova.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2025/molly-and-her-week-of-wonders.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2025/artifaxing-wins.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2025/eunuch-for-the-kingdom.txt",
    src: "/lorem-ipsum.txt",
  },
  { type: "directory", path: "/1099/2024" },
  {
    type: "file",
    path: "/1099/2024/masonic-musik.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2024/chalkheads-playground.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2024/mokk.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2024/awaken.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/1099/2024/seekr-trending.txt",
    src: "/lorem-ipsum.txt",
  },
  { type: "directory", path: "/w-2" },
  {
    type: "file",
    path: "/w-2/offsec.txt",
    src: "/lorem-ipsum.txt",
  },
  {
    type: "file",
    path: "/w-2/begeeked-labs.txt",
    src: "/lorem-ipsum.txt",
  },
  { type: "directory", path: "/fun" },
  { type: "directory", path: "/fun/2025" },
  { type: "directory", path: "/fun/2024" },
  { type: "directory", path: "/fun/2023" },
  { type: "directory", path: "/fun/2022" },
  { type: "directory", path: "/fun/2021" },
  { type: "directory", path: "/fun/2019" },
  { type: "directory", path: "/fun/2016" },
  { type: "file", path: "/find-me.txt", src: "/lorem-ipsum.txt" },
];
