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

export function lastPathSegment(path: string): string {
  return `/${path.split("/").pop()}`;
}
