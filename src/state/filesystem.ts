import store2 from "store2";
import { proxy, subscribe } from "valtio";

const STORAGE_NAMESPACE = "filesystem";
const OPEN_DIRECTORIES_STORAGE_KEY = "open_directories";

const store = store2.namespace(STORAGE_NAMESPACE);

export const filesystemState = proxy<{
  openDirectories: string[];
}>({
  openDirectories: store.get(OPEN_DIRECTORIES_STORAGE_KEY) || [],
});

subscribe(filesystemState, () => {
  store.set(OPEN_DIRECTORIES_STORAGE_KEY, filesystemState.openDirectories);
});
