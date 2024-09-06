"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to the dashboard if the user is already logged in
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mx-3 my-6 gap-10 mt-16">
        <div className="text-xl font-bold sm:text-3xl">
          <h1>Login/Signup To Get Started</h1>
        </div>
        <div className="flex flex-col gap-2 p-10">
          {/* Google Sign-In Button */}
          <button
            onClick={() => signIn("google")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {/* Google Icon */}
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48" version="1.1">
              {/* SVG Paths for Google Logo */}
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* LinkedIn Sign-In Button */}
          <button
            onClick={() => signIn("linkedin")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {/* LinkedIn Icon */}
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 44 44" version="1.1">
              {/* SVG Paths for LinkedIn Logo */}
            </svg>
            <span>Continue with LinkedIn</span>
          </button>

          {/* Twitter Sign-In Button */}
          <button
            onClick={() => signIn("twitter")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {/* Twitter Icon */}
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -4 48 48" version="1.1">
              {/* SVG Paths for Twitter Logo */}
            </svg>
            <span>Continue with Twitter</span>
          </button>

          {/* Facebook Sign-In Button */}
          <button
            onClick={() => signIn("facebook")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {/* Facebook Icon */}
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1">
              {/* SVG Paths for Facebook Logo */}
            </svg>
            <span>Continue with Facebook</span>
          </button>

          {/* GitHub Sign-In Button */}
          <button
            onClick={() => signIn("github")}
            className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {/* GitHub Icon */}
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 73" version="1.1">
              {/* SVG Paths for GitHub Logo */}
            </svg>
            <span>Continue with GitHub</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
