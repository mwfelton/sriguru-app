"use client";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import { decodeToken } from "../../lib/auth/decodeUserId";
import NewPractice from '../../components/dashboard/NewPractice';

export default function UserPage() {
  const { data: session } = useSession(); // For client-side session access
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession(); // Await the session Promise
      const idToken = sessionData?.id_token; // Use id_token to decode user ID if required
      
      if (idToken) {
        const decodedToken = decodeToken(idToken);
        console.log("Decoded Token:", decodedToken); // Log to inspect
        const userIdFromToken = decodedToken?.sub || null; // Adjust based on token structure
        setUserId(userIdFromToken);
      } else {
        console.error("No id_token found in session");
      }
    };
    fetchSession();
  }, []);

  console.log("User ID:", userId);

  return (
    <main className="flex min-h-screen flex-col items-center py-10 px-20">
      <div className="w-full lg:flex">
       <h1 className="text-2xl">Your Dashboard, {session?.user?.email}</h1>
       <NewPractice userId={userId}/>
      </div>
      <div className="w-full lg:flex bg-seashell">
       <h1 className="text-1xl">User Practices</h1>
      </div>
    </main>
  );
}
