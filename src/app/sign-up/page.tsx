'use client'; // Ensure client-side rendering for form handling
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { registerUser, confirmSignUp, resendVerificationCode } from '@/lib/cognito';
import { useRouter } from 'next/navigation'; // Adjusted import for app directory
import { validateForm } from '../../lib/validation';

export default function SignUp() {
  const [formData, setFormData] = useState({username: '', email: '', password: ''});
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);  // Separate state for email error
  const [passwordError, setPasswordError] = useState<string | null>(null);  // Separate state for password error
  const [verificationStep, setVerificationStep] = useState(false); // Track signup status
  const [verificationCode, setVerificationCode] = useState(''); // State for verification code

  const router = useRouter(); // Initialize useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formValidations = validateForm(formData);
    if (formValidations?.email !== null) {
      setEmailError(formValidations?.email || null);
    } else if (formValidations?.password !== null) {
      setPasswordError(formValidations?.password || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formValidations = validateForm(formData);
    setEmailError(formValidations?.email || null);
    setPasswordError(formValidations?.password || null);
    if (formValidations) {
      return; // Prevent form submission if there are validation errors
    }
    
    try {
      await registerUser(formData.email, formData.password, formData.username);
      setVerificationStep(true); // Show the verification form
    } catch (err: any) {
      if (err?.code === "UsernameExistsException") {
        setError("The username is already taken. Please choose a different one.");
      } else {
        setError("Error creating account. Please try again.");
      }
      console.error("Error during registration:", err);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmSignUp(formData.username, verificationCode);

      await signIn("credentials", {
        email: formData.username, // Assuming identifier is the email field
        password: formData.password,
        redirect: false, // Prevent default redirect to handle errors
    });

      router.push('/dashboard'); // Navigate to the dashboard
    } catch (err) {
      setError('Verification failed. Please check the code or try again.');
      console.error(err);
    }
  };

  const resendCode = async () => {
    try {
      const message = await resendVerificationCode(formData.username);
      alert(message);
    } catch (err) {
      console.error(err);
      alert("Failed to resend the code. Please try again later.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            {verificationStep ? 'Verify Your Account' : 'Create an Account to start tracking your Sadhana'}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!verificationStep ? (
            <form noValidate className="space-y-6" method="POST" onSubmit={handleSubmit}>
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm"
                  />
                </div>
              </div>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm"
                  />
                </div>
                {emailError && <p className="mt-2 text-red-600">{emailError}</p>}
              </div>
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm"
                  />
                </div>
                {passwordError && <p className="mt-2 text-red-600">{passwordError}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                >
                  Register
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-900">
                  Verification Code
                </label>
                <div className="mt-2">
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                >
                  Verify Account
                </button>
                <button
                  type="button"
                  onClick={resendCode}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Resend Code
                </button>
              </div>
            </form>
          )}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </main>
  );
}
