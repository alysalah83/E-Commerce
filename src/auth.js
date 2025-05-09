import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { addUser, checkEmailExists, getUserByEmail } from "./lib/data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
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
      console.log(user);
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
