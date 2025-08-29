"use client";

import { useQuery } from "@tanstack/react-query";
import assert from "assert";
import { FileIcon, FullscreenIcon, MinimizeIcon, XIcon } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { getFileOrDirectory } from "~/data/filesystem";
import { cn } from "~/utils";
import { FileTreeExplorer } from "./file-tree-explorer";
import {
  Window,
  WindowContent,
  WindowTitle,
  WindowTitlebar,
  WindowTitlebarButton,
} from "./window";
import { ContentRenderer } from "./content-renderer";

export const FileExplorer = memo(() => {
  const [windowIsFullscreen, setWindowIsFullscreen] = useState(false);
  const [expandedDirectories, setExpandedDirectories] = useState<string[]>([]);
  const [openFilePath, setOpenFilePath] = useState<string | null>(null);

  const openFile = openFilePath ? getFileOrDirectory(openFilePath) : null;
  if (openFile && openFile.type !== "file") {
    throw new Error(`"${openFilePath}" is not a file`);
  }

  const fileContentsQuery = useQuery({
    enabled: !!openFile,
    queryKey: ["file-contents", openFile?.src],
    queryFn: async () => {
      assert(openFile, "openFile is not a file");
      const res = await fetch(openFile.src);
      return res.text();
    },
  });

  const handleCloseFile = useCallback(() => setOpenFilePath(null), []);
  const handleToggleWindowFullscreen = useCallback(
    () => setWindowIsFullscreen((prev) => !prev),
    []
  );

  const hideFileExplorer = !openFile || !windowIsFullscreen;

  return (
    <div className="w-full h-full flex flex-col-reverse md:flex-row">
      {hideFileExplorer && (
        <div
          className={cn(
            "p-2 overflow-y-auto overflow-x-hidden flex-1",
            openFile && "max-h-42 md:max-h-full md:min-w-sm"
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
        <Window className="flex-col-reverse md:flex-col flex-1 border-0 border-b md:border-b-0 md:border-l">
          <WindowTitlebar className="border-0 border-t md:border-t-0 md:border-b">
            <WindowTitlebarButton>
              <FileIcon className="size-4" />
            </WindowTitlebarButton>
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
            {fileContentsQuery.data && (
              <ContentRenderer
                filename={openFile.path}
                content={fileContentsQuery.data}
              />
            )}
          </WindowContent>
        </Window>
      )}
    </div>
  );
});
FileExplorer.displayName = "FileExplorer";
