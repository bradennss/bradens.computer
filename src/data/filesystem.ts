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
  { type: "directory", path: "/1099" },
  { type: "directory", path: "/1099/2025" },
  {
    type: "file",
    path: "/1099/2025/comunal.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2025/diana kova.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2025/molly and her week of wonders.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2025/artifaxing + wins.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2025/eunuch for the kingdom.txt",
    src: "/test.txt",
  },
  { type: "directory", path: "/1099/2024" },
  {
    type: "file",
    path: "/1099/2024/masonic musik.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2024/chalkhead's playground.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2024/mokk.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2024/awaken.txt",
    src: "/test.txt",
  },
  {
    type: "file",
    path: "/1099/2024/seekr trending.txt",
    src: "/test.txt",
  },
  { type: "directory", path: "/w-2" },
  { type: "directory", path: "/w-2/2021 - now" },
  {
    type: "file",
    path: "/w-2/2021 - now/offsec.txt",
    src: "/test.txt",
  },
  { type: "directory", path: "/w-2/2020 - 2021" },
  {
    type: "file",
    path: "/w-2/2020 - 2021/begeeked labs.txt",
    src: "/test.txt",
  },
  { type: "directory", path: "/fun" },
  { type: "directory", path: "/fun/2025" },
  { type: "directory", path: "/fun/2024" },
  { type: "directory", path: "/fun/2023" },
  { type: "directory", path: "/fun/2022" },
  { type: "directory", path: "/fun/2021" },
  { type: "directory", path: "/fun/2019" },
  { type: "directory", path: "/fun/2016" },
  { type: "file", path: "/find me.txt", src: "/test.txt" },
];
