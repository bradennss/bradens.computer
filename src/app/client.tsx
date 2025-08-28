"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ExternalLinkIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import {
  FilesystemDirectoryItem,
  FilesystemExternalLinkItem,
  FilesystemFileItem,
  FilesystemItem,
} from "~/filesystem/types";
import { listItemsAtPath, lastPathSegment } from "~/filesystem/utils";
import { useSnapshot } from "valtio";
import { filesystemState } from "~/state/filesystem";

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
  return <p className="pl-5">{lastPathSegment(item.path)}</p>;
});
FiletreeFileComponent.displayName = "FiletreeFileComponent";

export const FiletreeRoot = memo<{ filesystem: FilesystemItem[] }>(
  ({ filesystem }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const items = listItemsAtPath(filesystem, "/");
    const openDirectories = useSnapshot(filesystemState).openDirectories;

    const onValueChange = useCallback((value: string[]) => {
      filesystemState.openDirectories = value;
    }, []);

    return (
      <Accordion
        type="multiple"
        value={isClient ? (openDirectories as string[]) : []}
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
