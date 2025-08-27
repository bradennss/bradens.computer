import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { memo, PropsWithChildren } from "react";
import { cn } from "~/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bradens.computer",
};

const RootLayout = memo<PropsWithChildren>(({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-background text-foreground"
        )}
      >
        {children}
      </body>
    </html>
  );
});
RootLayout.displayName = "RootLayout";

export default RootLayout;
