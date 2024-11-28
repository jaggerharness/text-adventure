"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <>
      <section
        className={
          "flex flex-row bg-primary-foreground justify-between items-center p-4 border-b border-border/40"
        }
      >
        <Link href="/">
          <Image
            aria-hidden
            src="/TextVenture.svg"
            alt="File icon"
            width={250}
            height={250}
          />
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="/adventures"
            className={`hover:ttxt-primary/40 transition-colors ${
              pathname === "/adventures" ? "text-primary" : ""
            }`}
          >
            Adventures
          </Link>
          <Link
            href="/creator-portal"
            className={`hover:text-primary/40 transition-colors ${
              pathname === "/creator-portal" ? "text-primary" : ""
            }`}
          >
            Creator Portal
          </Link>
          <Link
            href="/leaderboards"
            className={`hover:text-primary/40 transition-colors ${
              pathname === "/leaderboards" ? "text-primary" : ""
            }`}
          >
            Leaderboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/jaggerharness.png"
                    alt="@jaggerharness"
                  />
                  <AvatarFallback>JH</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Jagger Harness
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    jagger.dev@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={"/profile"}>Profile</Link>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/billing"}>Billing</Link>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/settings"}>Settings</Link>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/"}>Log out</Link>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      {children}
    </>
  );
}
