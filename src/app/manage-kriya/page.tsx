import React from 'react'
import Manager from "../components/Manager";
 

export default function ManageKriya() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       <h1>Manage Kriya</h1>
       <Manager />
      </div>

    
    </main>
  );
}


