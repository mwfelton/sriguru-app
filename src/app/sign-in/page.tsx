"use client"; // This marks the file as a Client Component

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Adjusted import for app directory

export default function SignIn() {
    const [identifier, setIdentifier] = useState(""); // Unified field for email or username
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            // Sending identifier as either email or username
            email: identifier.includes('@') ? identifier : undefined, // If identifier contains '@', treat it as email
            username: !identifier.includes('@') ? identifier : undefined, // Otherwise, treat it as username
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            // Redirect to dashboard or home page after successful sign-in
            router.push("/dashboard");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSignIn} method="POST">
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-medium text-gray-900">
                                Email Address or Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text" // Allow both email and username as text
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
