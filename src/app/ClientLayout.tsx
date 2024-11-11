'use client';  // This ensures everything below is client-side only
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider>
        <Navbar />
        <main className="pt-24 bg-platinum">{children}</main>
      </SessionProvider>
    );
  }
  