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

export type TextTreeItem = BaseTreeItem & {
  type: "text";
};

export type TreeItem = FolderTreeItem | ExternalLinkTreeItem | TextTreeItem;

export const tree: TreeItem[] = [
  {
    name: "1099",
    type: "folder",
    items: [
      {
        name: "2025",
        type: "folder",
        items: [],
      },
      {
        name: "2024",
        type: "folder",
        items: [],
      },
    ],
  },
  {
    name: "w-2",
    type: "folder",
    items: [
      {
        name: "2021",
        type: "folder",
        items: [],
      },
      {
        name: "2020",
        type: "folder",
        items: [],
      },
    ],
  },
  {
    name: "fun",
    type: "folder",
    items: [
      {
        name: "2025",
        type: "folder",
        items: [],
      },
      {
        name: "2024",
        type: "folder",
        items: [],
      },
      {
        name: "2023",
        type: "folder",
        items: [],
      },
      {
        name: "2022",
        type: "folder",
        items: [],
      },
      {
        name: "2021",
        type: "folder",
        items: [],
      },
      {
        name: "2019",
        type: "folder",
        items: [],
      },
      {
        name: "2016",
        type: "folder",
        items: [],
      },
    ],
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
