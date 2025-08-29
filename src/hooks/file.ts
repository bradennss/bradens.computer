import { useQuery } from "@tanstack/react-query";
import { FilesystemFile } from "~/data/filesystem";

export function useFileContentsQuery(file: FilesystemFile) {
  return useQuery({
    queryKey: ["file-contents", file.path],
    queryFn: () => fetch(file.src).then((res) => res.text()),
  });
}
