import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ExternalLinkIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { FolderTreeItem, ExternalLinkTreeItem, TreeItem } from "~/data";

const TreeItemComponent = memo<{ item: TreeItem }>(({ item }) => {
  switch (item.type) {
    case "folder":
      return <TreeFolderComponent item={item} />;
    case "external-link":
      return <TreeExternalLinkComponent item={item} />;
  }
});
TreeItemComponent.displayName = "TreeItemComponent";

const TreeFolderComponent = memo<{ item: FolderTreeItem }>(({ item }) => {
  return (
    <AccordionItem className="group" value={item.name}>
      <AccordionTrigger className="flex items-center">
        <div className="flex items-center size-5">
          <PlusIcon className="size-4 group-data-[state=open]:hidden" />
          <MinusIcon className="size-4 hidden group-data-[state=open]:block" />
        </div>
        {item.name}
      </AccordionTrigger>
      <AccordionContent className="pl-5">
        {item.items.map((item) => (
          <TreeItemComponent key={item.name} item={item} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
});
TreeFolderComponent.displayName = "TreeFolderComponent";

const TreeExternalLinkComponent = memo<{ item: ExternalLinkTreeItem }>(
  ({ item }) => {
    return (
      <Link
        href={item.url}
        target={`external_link_${item.name}`}
        className="flex items-center"
      >
        <div className="flex items-center size-5">
          <ExternalLinkIcon className="size-4" />
        </div>
        {item.name}
      </Link>
    );
  }
);
TreeExternalLinkComponent.displayName = "TreeExternalLinkComponent";

export const TreeRoot = memo<{ items: TreeItem[] }>(({ items }) => {
  return (
    <Accordion type="multiple">
      {items.map((item) => (
        <TreeItemComponent key={item.name} item={item} />
      ))}
    </Accordion>
  );
});
TreeRoot.displayName = "TreeRoot";
