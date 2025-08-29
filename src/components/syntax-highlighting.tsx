import { common, createStarryNight } from "@wooorm/starry-night";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { forwardRef, HTMLProps, ReactNode, useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "~/utils";

const starryNight = await createStarryNight(common);

export const SyntaxHighlighting = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & { flag: string }
>(({ className, children, flag, ...props }, ref) => {
  const reactNodes = useMemo<ReactNode>(() => {
    const scope = starryNight.flagToScope(flag);
    if (scope) {
      const tree = starryNight.highlight(
        String(children).replace(/\n$/, "").trim(),
        scope
      );
      const reactNode = toJsxRuntime(tree, { Fragment, jsx, jsxs });
      return reactNode;
    }
  }, [children, flag]);

  return (
    <code ref={ref} className={cn("syntax", flag, className)} {...props}>
      {reactNodes ?? children}
    </code>
  );
});
SyntaxHighlighting.displayName = "SyntaxHighlighting";

export default SyntaxHighlighting;
