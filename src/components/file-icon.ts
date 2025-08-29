import { FileIcon, ImageIcon, LucideIcon } from "lucide-react";

export function getFileIcon(filename: string): LucideIcon {
  const extension = filename.split(".").pop();

  switch (extension) {
    case "apng":
    case "png":
    case "avif":
    case "gif":
    case "jpg":
    case "jpeg":
    case "jfif":
    case "pjpeg":
    case "pjp":
    case "png":
    case "svg":
    case "webp":
      return ImageIcon;
  }

  return FileIcon;
}
