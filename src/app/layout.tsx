import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import cn from "classnames";
import "./globals.css";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Kalle's Blog",
  description:
    "Hi I'm Kalle, a software engineer working in the Berlin startup scene. This is my blog where I write about software engineering, programming, and other things that interest me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          GeistSans.className,
          "flex min-h-dvh flex-col",
        )}
      >
        {children}
        <div className="flex-1" />
        <Footer />
      </body>
    </html>
  );
}
