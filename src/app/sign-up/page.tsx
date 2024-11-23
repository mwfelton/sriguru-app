'use client'; // Ensure client-side rendering for form handling
import React, { useState } from 'react';
import { registerUser } from '@/lib/cognito'; // Adjust this import path if needed
import { useRouter } from 'next/navigation'; // Adjusted import for app directory
import { validateForm } from '../../lib/validation';

export default function SignUp() {
  const [formData, setFormData] = useState({username: '', email: '', password: ''});
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);  // Separate state for email error
  const [passwordError, setPasswordError] = useState<string | null>(null);  // Separate state for password error
  

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
      router.push("/dashboard"); // Navigate to the dashboard page
    } catch (err) {
      setError('Error creating account. Please try again.');
      console.error(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create an Account to start tracking your Sadhana
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" method="POST" onSubmit={handleSubmit}>
              {/* Username Input Field */}
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
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              {/* Email Input Field */}
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
                    onBlur={handleBlur} // Trigger validation on blur
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              {emailError && <p className="mt-2 text-red-600">{emailError}</p>}

              {/* Password Input Field */}
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
                    onBlur={handleBlur} // Trigger validation on blur
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              {passwordError && <p className="mt-2 text-red-600">{passwordError}</p>}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        </div>
      </div>
    </main>
  );
}
