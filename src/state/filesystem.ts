import store2 from "store2";
import { proxy, subscribe } from "valtio";

const STORAGE_NAMESPACE = "filesystem";
const OPEN_DIRECTORIES_STORAGE_KEY = "open-directories";

const store = store2.namespace(STORAGE_NAMESPACE);

export const filesystemState = proxy<{
  openDirectories: Record<string, boolean>;
}>({
  openDirectories: store.get(OPEN_DIRECTORIES_STORAGE_KEY) || {},
});

subscribe(filesystemState, () => {
  store.set(OPEN_DIRECTORIES_STORAGE_KEY, filesystemState.openDirectories);
});

export function openDirectory(path: string) {
  filesystemState.openDirectories[path] = true;
}

export function closeDirectory(path: string) {
  delete filesystemState.openDirectories[path];
}

export function isDirectoryOpen(path: string) {
  return !!filesystemState.openDirectories[path];
}
