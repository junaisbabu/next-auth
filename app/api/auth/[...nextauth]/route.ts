import { users } from "@/helpers/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter Email" },
        password: { label: "Password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        if (!credentials || credentials.email || credentials.password) {
          return null;
        }
        const user = users.find((user) => user.email === credentials.email);
        if (user?.password === credentials.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
