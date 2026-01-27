import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import AppleProvider from "next-auth/providers/apple";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import User from "@/models/User";
import connectDb from "@/db/connectDb";



export const authoptions = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET,
        // }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
                await connectDb();
                // Check if the user already exists in the database
                const currentUser = await User.findOne({ email: email });
                if (!currentUser) {
                    // If not, create a new user
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                    });
                }
            }
            return true;
        },

        async session({ session, user, token }) {
            await connectDb();
            const dbUser = await User.findOne({ email: session.user.email });
            session.user.name = dbUser.username;
            return session;
        },

    }
})

export { authoptions as GET, authoptions as POST };