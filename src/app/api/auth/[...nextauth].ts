// app/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { CognitoUserPool } from "amazon-cognito-identity-js";

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    } as any),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const userPool = new CognitoUserPool({
          UserPoolId: process.env.COGNITO_USER_POOL_ID as string,
          ClientId: process.env.COGNITO_CLIENT_ID as string,
        });

        const cognitoUser = new CognitoUser({
          Username: credentials.email,
          Pool: userPool,
        });

        const authDetails = new AuthenticationDetails({
          Username: credentials.email,
          Password: credentials.password,
        });

        return new Promise((resolve, reject) => {
          cognitoUser.authenticateUser(authDetails, {
            onSuccess: (session) => {
              const idToken = session.getIdToken().getJwtToken();
              resolve({
                id: session.getIdToken().payload.sub,
                email: credentials.email,
                idToken, // `idToken` will now be recognized thanks to type extension
              });
            },
            onFailure: (err) => reject(err),
          });
        });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.idToken) {
        token.id_token = user.idToken; // Store id_token in JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token; // Attach id_token to the session
      return session;
    },
  },
});
