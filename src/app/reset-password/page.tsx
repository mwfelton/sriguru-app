"use client"; // This marks the file as a Client Component

import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState(''); // Input for verification code
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, code }),
      });

      if (response.ok) {
        alert('Password reset successfully!');
        // Redirect to login or dashboard
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to reset password. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-6 lg:px-8">
      <div className="sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-900">
              Verification Code
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Reset Password
            </button>
            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
