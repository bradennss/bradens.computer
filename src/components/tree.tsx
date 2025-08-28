import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ExternalLinkIcon, MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import {
  FolderTreeItem,
  ExternalLinkTreeItem,
  TreeItem,
  TextTreeItem,
} from "~/data";

const TreeItemComponent = memo<{ item: TreeItem; parent?: TreeItem }>(
  ({ item, parent }) => {
    switch (item.type) {
      case "folder":
        return <TreeFolderComponent item={item} parent={parent} />;
      case "external-link":
        return <TreeExternalLinkComponent item={item} />;
      case "text":
        return <TreeTextComponent item={item} />;
    }
  }
);
TreeItemComponent.displayName = "TreeItemComponent";

const TreeFolderComponent = memo<{ item: FolderTreeItem; parent?: TreeItem }>(
  ({ item, parent }) => {
    const id = `${parent?.name}-${item.name}`;

    return (
      <AccordionItem className="group" value={id}>
        <AccordionTrigger className="flex items-center gap-1 [&[data-state=open]>svg:nth-child(1)]:hidden [&[data-state=open]>svg:nth-child(2)]:block">
          <PlusIcon className="size-4" />
          <MinusIcon className="size-4 hidden" />
          {item.name}
        </AccordionTrigger>
        <AccordionContent className="pl-5 border-l border-foreground/25">
          {item.items.map((child) => (
            <TreeItemComponent key={child.name} item={child} parent={item} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }
);
TreeFolderComponent.displayName = "TreeFolderComponent";

const TreeExternalLinkComponent = memo<{ item: ExternalLinkTreeItem }>(
  ({ item }) => {
    return (
      <Link
        href={item.url}
        target={`external_link_${item.name}`}
        className="flex items-center gap-1"
      >
        <ExternalLinkIcon className="size-4" />
        {item.name}
      </Link>
    );
  }
);
TreeExternalLinkComponent.displayName = "TreeExternalLinkComponent";

const TreeTextComponent = memo<{ item: TextTreeItem }>(({ item }) => {
  return <p className="pl-5">{item.name}</p>;
});
TreeTextComponent.displayName = "TreeTextComponent";

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
