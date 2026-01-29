import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDb();

        const currentUser = await User.findOne({ email: user.email });

        if (!currentUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
      }
      return true;
    },

    async session({ session }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
