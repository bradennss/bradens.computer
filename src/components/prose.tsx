import { forwardRef, HTMLProps } from "react";
import { cn } from "~/utils";
import styles from "./prose.module.css";

export const Prose = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(styles.prose, className)} {...props}>
        {children}
      </div>
    );
  }
);

Prose.displayName = "Prose";
