import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

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
            "flex flex-col items-start gap-2 border-b border-border/40 py-8 px-2"
          }
        >
          <Image
            aria-hidden
            src="/StoryFlux.svg"
            alt="File icon"
            width={250}
            height={250}
          />
        </section>
        {children}
      </body>
    </html>
  );
}
