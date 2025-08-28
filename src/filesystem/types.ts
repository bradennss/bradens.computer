type BaseFilesystemItem = {
  path: string;
  type: unknown;
};

export type FilesystemDirectory = BaseFilesystemItem & {
  type: "directory";
};

type BaseFilesystemFile = BaseFilesystemItem & {
  type: "file";
  contentType: unknown;
};

export type FilesystemTextFile = BaseFilesystemFile & {
  contentType: "text";
  src: string;
};

export type FilesystemImageFile = BaseFilesystemFile & {
  contentType: "image";
  src: string;
};

export type FilesystemComponentFile = BaseFilesystemFile & {
  contentType: "component";
  src: string;
};

export type FilesystemFile =
  | FilesystemTextFile
  | FilesystemImageFile
  | FilesystemComponentFile;

export type FilesystemItem = FilesystemDirectory | FilesystemFile;
