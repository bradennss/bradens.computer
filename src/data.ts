type BaseTreeItem = {
  name: string;
  type: unknown;
};

export type FolderTreeItem = BaseTreeItem & {
  type: "folder";
  items: TreeItem[];
};

export type ExternalLinkTreeItem = BaseTreeItem & {
  type: "external-link";
  url: string;
};

export type TreeItem = FolderTreeItem | ExternalLinkTreeItem;

export const tree: TreeItem[] = [
  {
    name: "1099",
    type: "folder",
    items: [],
  },
  {
    name: "w-2",
    type: "folder",
    items: [],
  },
  {
    name: "projects",
    type: "folder",
    items: [],
  },
  {
    name: "find me",
    type: "folder",
    items: [
      {
        name: "instagram",
        type: "external-link",
        url: "https://www.instagram.com/bradennss",
      },
      {
        name: "github",
        type: "external-link",
        url: "https://github.com/bradennss",
      },
    ],
  },
];
