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
      name: string | null
      username: string | null
      bio: string | null
      email: string
      emailVerified: Date | null
      image: string | null

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
          ...currentUser,
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
