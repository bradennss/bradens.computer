type BaseFilesystemItem = {
  path: string;
  type: unknown;
};

export type FilesystemDirectory = BaseFilesystemItem & {
  type: "directory";
};

export type FilesystemFile = BaseFilesystemItem & {
  type: "file";
  content: string;
};

export type FilesystemItem = FilesystemDirectory | FilesystemFile;
