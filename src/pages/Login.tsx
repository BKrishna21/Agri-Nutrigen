

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import {
  Leaf,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight
} from 'lucide-react';

import {
  registerUser,
  loginUser,
} from '../services/authService';

export default function Login() {

  const { user, loading, setUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from =
    (location.state &&
      location.state.from &&
      location.state.from.pathname) ||
    "/dashboard";

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleEmailAuth = async function (e) {

    e.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {

      let data;

      // SIGN UP
      if (isSignUp) {

        data = await registerUser({
          displayName,
          email,
          password,
        });

      } else {

        data = await loginUser({
          email,
          password,
        });
      }

      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // IMPORTANT FIX
      // Update React auth state
      setUser(data.user);

      console.log("USER SAVED");

      // Navigate to dashboard
      navigate("/dashboard", {
        replace: true
      });

    } catch (error) {

      console.log("LOGIN ERROR:", error);

      setError(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        "Something went wrong"
      );

    } finally {

      setIsSubmitting(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 py-12">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl border border-green-50 shadow-2xl relative overflow-hidden"
      >

        {/* Background Circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-40" />

        <div className="relative z-10 text-center">

          {/* Logo */}
          <div className="inline-flex p-3 bg-green-100 rounded-2xl mb-6">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-green-950 mb-2">
            {isSignUp
              ? 'Join AgriNutrigen'
              : 'Welcome Back'}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 mb-8 text-sm max-w-xs mx-auto">
            {isSignUp
              ? "Start planning your community's nutritional future today."
              : "Sign in to your account to continue planning."}
          </p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form
            onSubmit={handleEmailAuth}
            className="space-y-4 text-left"
          >

            {/* Full Name */}
            {isSignUp && (

              <div className="space-y-1">

                <label className="text-xs font-bold text-green-900 uppercase tracking-widest ml-1">
                  Full Name
                </label>

                <div className="relative">

                  <UserIcon
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />

                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) =>
                      setDisplayName(e.target.value)
                    }
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm"
                  />

                </div>

              </div>
            )}

            {/* Email */}
            <div className="space-y-1">

              <label className="text-xs font-bold text-green-900 uppercase tracking-widest ml-1">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />

                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm"
                />

              </div>

            </div>

            {/* Password */}
            <div className="space-y-1">

              <label className="text-xs font-bold text-green-900 uppercase tracking-widest ml-1">
                Password
              </label>

              <div className="relative">

                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />

                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-sm"
                />

              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center group disabled:opacity-70"
            >

              {isSubmitting ? (

                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />

              ) : (

                <>
                  {isSignUp
                    ? 'Create Account'
                    : 'Sign In'}

                  <ArrowRight
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}

            </button>

          </form>

          {/* Footer */}
          <p className="mt-8 text-sm text-gray-500">

            {isSignUp
              ? 'Already have an account?'
              : "Don't have an account?"}

            <button
              onClick={() =>
                setIsSignUp(!isSignUp)
              }
              className="ml-2 text-green-600 font-bold hover:underline"
            >
              {isSignUp
                ? 'Login'
                : 'Sign up'}
            </button>

          </p>

        </div>

      </motion.div>

    </div>
  );
}
