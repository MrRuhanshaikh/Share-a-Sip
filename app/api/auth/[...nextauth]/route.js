import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/app/models/User";
import connectDB from "@/app/db/connectDb";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: (profile.name || user.name || "").trim(),
          });
        } else {
          await User.updateOne(
            { email: user.email },
            {
              $set: {
                name: (profile.name || user.name || "").trim(),
              },
            }
          );
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.name;
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };
