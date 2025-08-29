"use client";

import { FullscreenIcon, MinimizeIcon, XIcon } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { getFileOrDirectory } from "~/data/filesystem";
import { cn, joinPath, splitPath } from "~/utils";
import { FileRenderer } from "./file-renderer";
import { FileTreeExplorer } from "./file-tree-explorer";
import {
  Window,
  WindowContent,
  WindowTitle,
  WindowTitlebar,
  WindowTitlebarButton,
} from "./window";
import { getFileIcon } from "./file-icon";

export const FileExplorer = memo<{
  baseUrlPath?: string;
  updateHistory?: boolean;
  initialExpandedDirectories?: string[];
  initialOpenFilePath?: string | null;
}>(
  ({
    baseUrlPath = "/",
    updateHistory = false,
    initialExpandedDirectories,
    initialOpenFilePath,
  }) => {
    const [windowIsFullscreen, setWindowIsFullscreen] = useState(false);
    const [expandedDirectories, setExpandedDirectories] = useState<string[]>(
      initialExpandedDirectories ?? []
    );
    const [openFilePath, setOpenFilePath] = useState<string | null>(
      initialOpenFilePath ?? null
    );

    useEffect(() => {
      if (updateHistory) {
        const newPath = joinPath(
          baseUrlPath,
          ...splitPath(openFilePath ?? "/").map(encodeURIComponent)
        );
        window.history.pushState(null, "", newPath);
      }
    }, [baseUrlPath, expandedDirectories, openFilePath, updateHistory]);

    const openFile = openFilePath ? getFileOrDirectory(openFilePath) : null;
    if (openFile && openFile.type !== "file") {
      throw new Error(`"${openFilePath}" is not a file`);
    }

    const handleCloseFile = useCallback(() => setOpenFilePath(null), []);
    const handleToggleWindowFullscreen = useCallback(
      () => setWindowIsFullscreen((prev) => !prev),
      []
    );

    const showFileExplorer = !openFile || !windowIsFullscreen;

    const FileIcon = openFile ? getFileIcon(openFile.path) : null;

    return (
      <div className="w-full h-full flex flex-col-reverse md:flex-row">
        {showFileExplorer && (
          <div
            className={cn(
              "py-2 overflow-y-auto overflow-x-hidden",
              openFile ? "h-42 md:h-auto md:min-w-sm" : "flex-1"
            )}
          >
            <FileTreeExplorer
              expandedDirectories={expandedDirectories}
              onExpandedDirectoriesChange={setExpandedDirectories}
              openFile={openFilePath}
              onOpenFileChange={setOpenFilePath}
            />
          </div>
        )}
        {openFile && (
          <Window
            className={cn(
              "flex-col-reverse md:flex-col flex-1 shrink-0 border-0 border-b md:border-b-0 md:border-l",
              !showFileExplorer && "border-b-0 md:border-l-0"
            )}
          >
            <WindowTitlebar className="border-0 border-t md:border-t-0 md:border-b">
              {FileIcon && (
                <WindowTitlebarButton>
                  <FileIcon className="size-4" />
                </WindowTitlebarButton>
              )}
              <WindowTitle>{openFile.path}</WindowTitle>
              <WindowTitlebarButton
                className="ml-auto"
                onClick={handleToggleWindowFullscreen}
              >
                {windowIsFullscreen ? (
                  <MinimizeIcon className="size-4" />
                ) : (
                  <FullscreenIcon className="size-4" />
                )}
              </WindowTitlebarButton>
              <WindowTitlebarButton onClick={handleCloseFile}>
                <XIcon className="size-4" />
              </WindowTitlebarButton>
            </WindowTitlebar>
            <WindowContent>
              <FileRenderer file={openFile} />
            </WindowContent>
          </Window>
        )}
      </div>
    );
  }
);
FileExplorer.displayName = "FileExplorer";
