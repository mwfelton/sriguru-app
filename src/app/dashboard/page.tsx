"use client";
import { useSession } from "next-auth/react";
import React from 'react'
import PracticeList from '../../components/dashboard/PracticeList';


export default function UserPage() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       <h1>user page</h1>
       <h1>Hi {session?.user?.email}</h1>
      </div>
      <PracticeList />

    
    </main>
  );
}


