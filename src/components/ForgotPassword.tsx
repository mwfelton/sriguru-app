import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setSuccessMessage('');
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage('Check your email for the reset link!');
        setTimeout(() => router.push('/reset-password'), 2000); // Redirect to the reset-password page
      } else {
        setEmailError(data.error || 'Error sending reset link');
      }
    } catch (error) {
      setEmailError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email Address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          />
        </div>
        {emailError && (
          <p className="mt-2 text-sm text-red-600">{emailError}</p>
        )}
        {successMessage && (
          <p className="mt-2 text-sm text-green-600">{successMessage}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
