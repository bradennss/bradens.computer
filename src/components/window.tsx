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
  <button
    ref={ref}
    className={cn(
      "px-1 h-full hover:bg-window-titlebar-button-hover focus-visible:bg-window-titlebar-button-hover",
      className
    )}
    {...props}
  />
));
WindowTitlebarButton.displayName = "WindowTitlebarButton";

export const WindowTitle = forwardRef<
  HTMLHeadingElement,
  HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("truncate px-1", className)} {...props} />
));
WindowTitle.displayName = "WindowTitle";

export const WindowContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex overflow-hidden flex-[1_1_1px]", className)}
    {...props}
  />
));
WindowContent.displayName = "WindowContent";
