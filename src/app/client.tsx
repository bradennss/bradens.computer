"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { FileIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { memo, useCallback } from "react";
import { useSnapshot } from "valtio";
import {
  FilesystemDirectory,
  FilesystemFile,
  FilesystemItem,
} from "~/filesystem/types";
import { lastPathSegment, listItemsAtPath } from "~/filesystem/utils";
import { useIsClient } from "~/hooks/client";
import {
  closeFile,
  filesystemState,
  openFile,
  useIsFileOpen,
} from "~/state/filesystem";
import { cn } from "~/utils";

const FiletreeItemComponent = memo<{
  filesystem: FilesystemItem[];
  item: FilesystemItem;
}>(({ filesystem, item }) => {
  switch (item.type) {
    case "directory":
      return <FiletreeFolderComponent filesystem={filesystem} item={item} />;
    case "file":
      return <FiletreeFileComponent item={item} />;
  }
});
FiletreeItemComponent.displayName = "FiletreeItemComponent";

const FiletreeFolderComponent = memo<{
  filesystem: FilesystemItem[];
  item: FilesystemDirectory;
}>(({ filesystem, item }) => {
  const items = listItemsAtPath(filesystem, item.path);

  return (
    <AccordionItem className="group" value={item.path}>
      <AccordionTrigger className="flex items-center gap-1 [&[data-state=open]>svg:nth-child(1)]:hidden [&[data-state=open]>svg:nth-child(2)]:block">
        <PlusIcon className="size-4" />
        <MinusIcon className="size-4 hidden" />
        <span>{lastPathSegment(item.path)}</span>
      </AccordionTrigger>
      <AccordionContent className="pl-5 border-l border-tree-indent">
        {items.map((child) => (
          <FiletreeItemComponent
            key={child.path}
            filesystem={filesystem}
            item={child}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
});
FiletreeFolderComponent.displayName = "FiletreeFolderComponent";

const FiletreeFileComponent = memo<{ item: FilesystemFile }>(({ item }) => {
  const isClient = useIsClient();
  const isOpen = useIsFileOpen(item.path);

  const handleToggleOpen = useCallback(() => {
    if (isOpen) {
      closeFile();
    } else {
      openFile(item.path);
    }
  }, [isOpen, item.path]);

  return (
    <button
      className={cn(
        "flex items-center gap-1",
        isClient && isOpen && "font-bold"
      )}
      onClick={handleToggleOpen}
    >
      <FileIcon className="size-4" />
      {lastPathSegment(item.path)}
    </button>
  );
});
FiletreeFileComponent.displayName = "FiletreeFileComponent";

export const FiletreeRoot = memo<{ filesystem: FilesystemItem[] }>(
  ({ filesystem }) => {
    const isClient = useIsClient();

    const items = listItemsAtPath(filesystem, "/");
    const openDirectories = useSnapshot(filesystemState).openDirectories;

    const onValueChange = useCallback((value: string[]) => {
      filesystemState.openDirectories = Object.fromEntries(
        value.map((path) => [path, true])
      );
    }, []);

    return (
      <Accordion
        type="multiple"
        value={isClient ? Object.keys(openDirectories) : []}
        onValueChange={onValueChange}
      >
        {items.map((item) => (
          <FiletreeItemComponent
            key={item.path}
            filesystem={filesystem}
            item={item}
          />
        ))}
      </Accordion>
    );
  }
);
FiletreeRoot.displayName = "FiletreeRoot";

const FileWindowErrorContent = memo<{ message: string }>(({ message }) => {
  return (
    <div className="p-2">
      <p>{message}</p>
    </div>
  );
});
FileWindowErrorContent.displayName = "FileWindowErrorContent";

export const OpenFileWindow = memo(() => {
  const isClient = useIsClient();
  const openFilePath = useSnapshot(filesystemState).openFile;

  const handleClose = useCallback(() => closeFile(), []);

  if (!isClient || !openFilePath) {
    return null;
  }

  return (
    <Dialog open modal={false}>
      <DialogPortal>
        <DialogContent className="outline-none fixed top-0 right-0 bottom-0 w-screen max-w-screen-lg border-l border-window-border h-[100svh] bg-window-background flex flex-col-reverse sm:flex-col">
          <div className="border-t sm:border-b sm:border-t-0 border-window-border bg-window-title-background flex gap-2 pl-2 text-window-title-foreground items-center">
            <FileIcon className="size-4" />
            <DialogTitle className="truncate">{openFilePath}</DialogTitle>
            <button className="p-1 ml-auto" onClick={handleClose}>
              <XIcon className="size-4" />
            </button>
          </div>
          <div className="flex-1 text-window-foreground">
            <FileWindowErrorContent message="Unable to render content" />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
});
OpenFileWindow.displayName = "OpenFileWindow";
