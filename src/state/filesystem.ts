import store2 from "store2";
import { proxy, subscribe, useSnapshot } from "valtio";

const STORAGE_NAMESPACE = "filesystem";
const OPEN_DIRECTORIES_STORAGE_KEY = "open-directories";
const OPEN_FILE_STORAGE_KEY = "open-file";

const store = store2.namespace(STORAGE_NAMESPACE);

export const filesystemState = proxy<{
  openDirectories: Record<string, boolean>;
  openFile: string | null;
}>({
  openDirectories: store.get(OPEN_DIRECTORIES_STORAGE_KEY) ?? {},
  openFile: store.get(OPEN_FILE_STORAGE_KEY) ?? null,
});

subscribe(filesystemState, () => {
  store.set(OPEN_DIRECTORIES_STORAGE_KEY, filesystemState.openDirectories);
  store.set(OPEN_FILE_STORAGE_KEY, filesystemState.openFile);
});

export function openDirectory(path: string) {
  filesystemState.openDirectories[path] = true;
}

export function closeDirectory(path: string) {
  delete filesystemState.openDirectories[path];
}

export function useIsDirectoryOpen(path: string) {
  return !!useSnapshot(filesystemState).openDirectories[path];
}

export function openFile(path: string) {
  filesystemState.openFile = path;
}

export function closeFile() {
  filesystemState.openFile = null;
}

export function useIsFileOpen(path: string) {
  return useSnapshot(filesystemState).openFile === path;
}
