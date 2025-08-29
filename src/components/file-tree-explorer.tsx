"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { FolderIcon, MinusIcon, PlusIcon } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  FilesystemDirectory,
  FilesystemFile,
  FilesystemItem,
  listDirectory,
} from "~/data/filesystem";
import { cn, lastPathSegment } from "~/utils";
import { getFileIcon } from "./file-icon";

const FileTreeExplorerItem = memo<{
  item: FilesystemItem;
  openFile: string | null;
  onClickFile: (path: string) => void;
}>(({ item, openFile, onClickFile }) => {
  const handleClickFile = useCallback(
    () => onClickFile?.(item.path),
    [item.path, onClickFile]
  );

  switch (item.type) {
    case "directory":
      return (
        <FileTreeExplorerFolder
          item={item}
          openFile={openFile}
          onClickFile={onClickFile}
        />
      );
    case "file":
      return (
        <FileTreeExplorerFile
          item={item}
          isOpen={openFile === item.path}
          onClick={handleClickFile}
        />
      );
  }
});
FileTreeExplorerItem.displayName = "FileTreeExplorerItem";

const FileTreeExplorerFolder = memo<{
  item: FilesystemDirectory;
  openFile: string | null;
  onClickFile: (path: string) => void;
}>(({ item, openFile, onClickFile }) => {
  const items = useMemo(() => listDirectory(item.path), [item.path]);

  return (
    <AccordionItem className="group" value={item.path}>
      <AccordionTrigger className="flex items-center gap-1 select-none whitespace-nowrap [&[data-state=open]>svg:nth-child(1)]:hidden [&[data-state=open]>svg:nth-child(2)]:block">
        <PlusIcon className="size-4" />
        <MinusIcon className="size-4 hidden" />
        <FolderIcon className="size-4" />
        <span>{lastPathSegment(item.path)}</span>
      </AccordionTrigger>
      <AccordionContent className="pl-5 border-l border-tree-indent">
        {items.map((child) => (
          <FileTreeExplorerItem
            key={child.path}
            item={child}
            openFile={openFile}
            onClickFile={onClickFile}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
});
FileTreeExplorerFolder.displayName = "FileTreeExplorerFolder";

const FileTreeExplorerFile = memo<{
  item: FilesystemFile;
  isOpen?: boolean;
  onClick?: () => void;
}>(({ item, isOpen, onClick }) => {
  const FileIcon = getFileIcon(item.path);

  return (
    <button
      className={cn(
        "flex items-center gap-1 select-none whitespace-nowrap",
        isOpen && "font-bold"
      )}
      onClick={onClick}
    >
      <PlusIcon className="size-4 opacity-0" />
      <FileIcon className="size-4" />
      {lastPathSegment(item.path)}
    </button>
  );
});
FileTreeExplorerFile.displayName = "FileTreeExplorerFile";

export const FileTreeExplorer = memo<{
  expandedDirectories?: string[];
  onExpandedDirectoriesChange?: (paths: string[]) => void;
  openFile?: string | null;
  onOpenFileChange?: (path: string | null) => void;
}>(
  ({
    expandedDirectories: providedExpandedDirectories,
    onExpandedDirectoriesChange,
    openFile: providedOpenFile,
    onOpenFileChange,
  }) => {
    const [internalExpandedDirectories, setInternalExpandedDirectories] =
      useState<string[]>([]);
    const expandedDirectories =
      providedExpandedDirectories === undefined
        ? internalExpandedDirectories
        : providedExpandedDirectories;

    const handleExpandedDirectoriesChange = useCallback(
      (value: string[]) => {
        setInternalExpandedDirectories(value);
        onExpandedDirectoriesChange?.(value);
      },
      [onExpandedDirectoriesChange]
    );

    const [internalOpenFile, setInternalOpenFile] = useState<string | null>(
      null
    );
    const openFile =
      providedOpenFile === undefined ? internalOpenFile : providedOpenFile;

    const handleOpenFile = useCallback(
      (path: string) => {
        if (openFile === path) {
          setInternalOpenFile(null);
          onOpenFileChange?.(null);
        } else {
          setInternalOpenFile(path);
          onOpenFileChange?.(path);
        }
      },
      [onOpenFileChange, openFile]
    );

    const items = useMemo(() => listDirectory("/"), []);

    return (
      <Accordion
        type="multiple"
        value={expandedDirectories}
        onValueChange={handleExpandedDirectoriesChange}
      >
        {items.map((item) => (
          <FileTreeExplorerItem
            key={item.path}
            item={item}
            openFile={openFile}
            onClickFile={handleOpenFile}
          />
        ))}
      </Accordion>
    );
  }
);
FileTreeExplorer.displayName = "FileTreeExplorer";
