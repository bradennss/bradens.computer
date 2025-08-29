import Image from "next/image";
import { memo } from "react";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { FilesystemFile } from "~/data/filesystem";
import { useFileContentsQuery } from "~/hooks/file";

const TextFileRenderer = memo<{ file: FilesystemFile }>(({ file }) => {
  const fileContentsQuery = useFileContentsQuery(file.src);

  return (
    <div className="p-4 w-full font-mono whitespace-pre-line overflow-y-auto overflow-x-hidden">
      {fileContentsQuery.data && <p>{fileContentsQuery.data}</p>}
    </div>
  );
});
TextFileRenderer.displayName = "TextFileRenderer";

const MarkdownFileRenderer = memo<{ file: FilesystemFile }>(({ file }) => {
  const fileContentsQuery = useFileContentsQuery(file.src);

  return (
    <div className="w-full p-4 overflow-y-auto overflow-x-hidden typography">
      <Markdown rehypePlugins={[rehypeSlug]}>{fileContentsQuery.data}</Markdown>
    </div>
  );
});
MarkdownFileRenderer.displayName = "MarkdownFileRenderer";

const ImageFileRenderer = memo<{ file: FilesystemFile }>(({ file }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        priority
        loading="eager"
        unoptimized
        src={file.src}
        alt={file.path}
        fill
        sizes="100vw"
        className="object-contain"
      />
    </div>
  );
});
ImageFileRenderer.displayName = "ImageFileRenderer";

export const FileRenderer = memo<{ file: FilesystemFile }>(({ file }) => {
  const extension = file.path.split(".").pop();

  switch (extension) {
    case "md":
    case "markdown":
      return <MarkdownFileRenderer file={file} />;
    case "apng":
    case "png":
    case "avif":
    case "gif":
    case "jpg":
    case "jpeg":
    case "jfif":
    case "pjpeg":
    case "pjp":
    case "png":
    case "svg":
    case "webp":
      return <ImageFileRenderer file={file} />;
  }

  return <TextFileRenderer file={file} />;
});
FileRenderer.displayName = "FileRenderer";
