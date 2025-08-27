import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { memo, PropsWithChildren } from "react";
import { cn } from "~/utils";

const abcDiatype = localFont({
  src: [
    {
      path: "./fonts/abc-diatype-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/abc-diatype-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/abc-diatype-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/abc-diatype-bold-italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-abc-diatype",
});

export const metadata: Metadata = {
  title: "bradens.computer",
};

const RootLayout = memo<PropsWithChildren>(({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          abcDiatype.variable,
          "antialiased bg-background text-foreground font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
});
RootLayout.displayName = "RootLayout";

export default RootLayout;
