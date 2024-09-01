import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
export const authoptions = NextAuth({
providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
]
})
export {authoptions as GET, authoptions as POST}
