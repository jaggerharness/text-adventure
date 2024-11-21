import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StoryFlux",
  description: "AI-powered, user-driven story generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section
          className={
            "flex flex-row justify-between items-center p-4 border-b border-border/40"
          }
        >
          <Link href="/">
            <Image
              aria-hidden
              src="/StoryFlux.svg"
              alt="File icon"
              width={250}
              height={250}
            />
          </Link>
          <Link href={"/adventures"}>
            <Button>Adventures</Button>
          </Link>
        </section>
        {children}
      </body>
    </html>
  );
}
