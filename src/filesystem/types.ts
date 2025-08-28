type BaseFilesystemItem = {
  path: string;
  type: unknown;
};

export type FilesystemDirectoryItem = BaseFilesystemItem & {
  type: "directory";
};

export type FilesystemFileItem = BaseFilesystemItem & {
  type: "file";
  content: string;
};

export type FilesystemExternalLinkItem = BaseFilesystemItem & {
  type: "external-link";
  href: string;
};

export type FilesystemItem =
  | FilesystemDirectoryItem
  | FilesystemFileItem
  | FilesystemExternalLinkItem;
