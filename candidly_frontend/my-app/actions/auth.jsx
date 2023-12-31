import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Missing Email or Password");
        }

        try {
          // const response = await fetch(`${process.env.LOCAL_ENDPOINT}/api/auth`, {
            const response = await fetch(`${process.env.PRODUCTION_ENDPOINT}/api/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await response.json();
          const authToken = response.headers.get("x-authentication");

          if (response.ok) {
            // console.log(user);
            return { user, authToken };
          }

          throw new Error(user.message);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {

      if (trigger === "update") {
        return {...token, ...session.user}
      }
      
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // strategy: "jwt";
      session.user = token;
      return session;
    },
  },
  session: { strategy: "jwt" }
};

export default NextAuth(authOptions);
