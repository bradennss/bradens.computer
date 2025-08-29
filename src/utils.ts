import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePath(path: string): string {
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function splitPath(path: string): string[] {
  return path
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
}

export function joinPath(...segments: string[]): string {
  return normalizePath(segments.join("/"));
}

export function lastPathSegment(path: string): string {
  return `/${path.split("/").pop()}`;
}

export function pathHeirarchy(path: string): string[] {
  const result: string[] = [];

  let current = "";
  for (const segment of splitPath(path)) {
    current += "/" + segment;
    result.push(current);
  }

  return result;
}
