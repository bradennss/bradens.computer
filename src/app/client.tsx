"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ExternalLinkIcon, FileIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { memo, useCallback } from "react";
import { useSnapshot } from "valtio";
import {
  FilesystemDirectoryItem,
  FilesystemExternalLinkItem,
  FilesystemFileItem,
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
    case "external-link":
      return <FiletreeExternalLinkComponent item={item} />;
  }
});
FiletreeItemComponent.displayName = "FiletreeItemComponent";

const FiletreeFolderComponent = memo<{
  filesystem: FilesystemItem[];
  item: FilesystemDirectoryItem;
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

const FiletreeExternalLinkComponent = memo<{
  item: FilesystemExternalLinkItem;
}>(({ item }) => {
  return (
    <Link
      href={item.href}
      target={`external_link_${item.path}`}
      className="flex items-center gap-1"
    >
      <ExternalLinkIcon className="size-4" />
      {lastPathSegment(item.path)}
    </Link>
  );
});
FiletreeExternalLinkComponent.displayName = "FiletreeExternalLinkComponent";

const FiletreeFileComponent = memo<{ item: FilesystemFileItem }>(({ item }) => {
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
