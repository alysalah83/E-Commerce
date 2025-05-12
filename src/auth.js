import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addUser, checkEmailExists, getUserByEmail } from "./lib/data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  debug: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },

    async signIn({ user }) {
      const fullName = user.name;
      const email = user.email;
      try {
        const isExist = await checkEmailExists(email);
        if (isExist) {
          return true;
        } else {
          await addUser({ fullName, email });
          return true;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async session({ session }) {
      const { id, fullName } = await getUserByEmail(session.user.email);
      if (!id || !fullName) throw new Error("couldn't get user information");
      session.user.userId = id;
      session.user.name = fullName;
      return session;
    },
  },
});
