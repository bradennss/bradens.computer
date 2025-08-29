import Link from "next/link";
import { memo } from "react";
import ReactMarkdown, {
  Options as ReactMarkdownOptions,
  Components as ReactMarkdownComponents,
} from "react-markdown";
import rehypeSlug from "rehype-slug";

const COMPONENTS: ReactMarkdownComponents = {
  a: ({ href, children }) => <Link href={href ?? "#"}>{children}</Link>,
};

export const Markdown = memo<ReactMarkdownOptions>(({ children, ...props }) => {
  return (
    <ReactMarkdown
      components={COMPONENTS}
      rehypePlugins={[rehypeSlug]}
      {...props}
    >
      {children}
    </ReactMarkdown>
  );
});

Markdown.displayName = "Markdown";
