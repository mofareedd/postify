import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { env } from "../env.mjs"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      //   clientId: env.GITHUB_ID,
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      // clientSecret: env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  // secret: env.NEXTAUTH_SECRET,
  secret: process.env.NEXTAUTH_SECRET,
}
