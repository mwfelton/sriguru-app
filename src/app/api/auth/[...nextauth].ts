// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { stringifyError } from "next/dist/shared/lib/utils";

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`, // User Pool Issuer URL
    } as any),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token; // Save the id_token if available
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token; // Attach the id_token to the session
      return session;
    },
  },
});
