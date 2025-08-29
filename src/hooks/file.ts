import { useQuery } from "@tanstack/react-query";

export function useFileContentsQuery(src: string) {
  return useQuery({
    queryKey: ["file-contents", src],
    queryFn: () => fetch(src).then((res) => res.text()),
  });
}
