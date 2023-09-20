import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {env} from '@/env.mjs';

export const authOptions = {
    providers: [
        GithubProvider({
        //   clientId: env.GITHUB_ID,
          clientId: process.env.GITHUB_ID ?? "",
          clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
    ]

    
}

export const handler = NextAuth({
    ...authOptions,
    pages: {
        signIn: '/signin'
    }

})

export { handler as GET, handler as POST }