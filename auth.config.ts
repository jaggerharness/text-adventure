import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {},
  callbacks: {
    authorized() {
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
