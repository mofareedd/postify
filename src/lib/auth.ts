import { redirect } from "next/navigation"
import { db } from "@/db/index"
import { users } from "@/db/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm"
import { DefaultSession, NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { env } from "../env.mjs"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      username: string
      bio?: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const currentUser = await db.query.users.findFirst({
        where: eq(users.id, user.id),
      })

      if (!currentUser) {
        redirect("/signin")
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          username: currentUser.username,
          bio: currentUser.bio ?? "",
        },
      }
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  secret: env.NEXTAUTH_SECRET,
}
