import { memo } from "react";
import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";

const TextContentRenderer = memo<{ content: string }>(({ content }) => {
  return (
    <div className="p-4 w-full font-mono whitespace-pre-line overflow-y-auto overflow-x-hidden">
      <p>{content}</p>
    </div>
  );
});
TextContentRenderer.displayName = "TextContentRenderer";

const MarkdownContentRenderer = memo<{ content: string }>(({ content }) => {
  return (
    <div className="w-full p-4 overflow-y-auto overflow-x-hidden typography">
      <Markdown rehypePlugins={[rehypeSlug]}>{content}</Markdown>
    </div>
  );
});
MarkdownContentRenderer.displayName = "MarkdownContentRenderer";

export const ContentRenderer = memo<{ filename: string; content: string }>(
  ({ filename, content }) => {
    const extension = filename.split(".").pop();

    switch (extension) {
      case "md":
      case "markdown":
        return <MarkdownContentRenderer content={content} />;
    }

    return <TextContentRenderer content={content} />;
  }
);
ContentRenderer.displayName = "ContentRenderer";
