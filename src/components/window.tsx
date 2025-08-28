import { forwardRef, HTMLAttributes, HTMLProps } from "react";
import { cn } from "~/utils";

export const Window = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-window-border bg-window-background flex flex-col",
        className
      )}
      {...props}
    />
  )
);
Window.displayName = "Window";

export const WindowTitlebar = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-b border-window-border bg-window-title-background flex text-window-title-foreground items-center select-none",
      className
    )}
    {...props}
  />
));
WindowTitlebar.displayName = "WindowTitlebar";

export const WindowTitlebarButton = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("px-1 h-full", className)} {...props} />
));
WindowTitlebarButton.displayName = "WindowTitlebarButton";

export const WindowTitle = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("truncate", className)} {...props} />
));
WindowTitle.displayName = "WindowTitle";

export const WindowContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-[1_1_1px] overflow-y-auto overflow-x-hidden",
      className
    )}
    {...props}
  />
));
WindowContent.displayName = "WindowContent";
