import Link from "next/link";
import { lazy, memo } from "react";
import ReactMarkdown, {
  Components as ReactMarkdownComponents,
  Options as ReactMarkdownOptions,
} from "react-markdown";
import rehypeSlug from "rehype-slug";

const SyntaxHighlighting = lazy(() => import("./syntax-highlighting"));

const COMPONENTS: ReactMarkdownComponents = {
  a: ({ href, children }) => <Link href={href ?? "#"}>{children}</Link>,
  code: ({ children, className }) => {
    const language = className?.split("-")[1];
    return (
      <SyntaxHighlighting flag={language ?? "text"}>
        {children}
      </SyntaxHighlighting>
    );
  },
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
