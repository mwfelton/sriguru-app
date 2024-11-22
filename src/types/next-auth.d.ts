// next-auth.d.ts
import NextAuth from "next-auth";
import { User as AdapterUser } from "next-auth/adapters"; // Import the AdapterUser

declare module "next-auth" {
  interface Session {
    id_token?: string; // Make sure Session has id_token
  }

  // Make sure to augment the User interface correctly
  interface User extends AdapterUser {
    idToken?: string; // Add idToken to the User type
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_token?: string; // Add id_token to JWT
  }
}
