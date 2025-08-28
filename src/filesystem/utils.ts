import { FilesystemItem } from "./types";

export function splitPath(path: string): string[] {
  return path
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
}

export function lastPathSegment(path: string): string {
  return `/${path.split("/").pop()}`;
}

export function listItemsAtPath(
  filesystem: FilesystemItem[],
  path: string
): FilesystemItem[] {
  const parentParts = splitPath(path);

  return filesystem.filter((item) => {
    const parts = splitPath(item.path);
    if (path === "/") {
      return parts.length === 1;
    }

    return (
      parts.length === parentParts.length + 1 &&
      parentParts.every((part, index) => parts[index] === part)
    );
  });
}
