"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  const { data: session } = useSession();
  const [dropdown, setdropdown] = useState(false);
  return (
    <nav className="absolute top-0 w-full ">
      <ul className="px-6 py-3 relative text-white backdrop-blur-md opacity-80 flex justify-between items-center">
        <div className="logo flex items-center sm:text-xl font-bold">
          <span>
            <li>
              <Link href="./">
                <span className="text-2xl sm:text-3xl bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent ">
                  S
                </span>
                hare a
                <span
                  className="border-b border-transparent text-xl sm:text-2xl "
                  style={{
                    borderImage:
                      "linear-gradient(to right, #38bdf8, #34d399) 1",
                  }}
                >
                  Sip
                </span>
              </Link>
            </li>
          </span>
          <li>
            <Image
              src="/favicon.ico"
              width={30}
              height={30}
              alt="Picture of the author"
            />
          </li>
        </div>
        {!session ? (
          <div className="flex sm:gap-5 ">
            <Link href="/login">
              <button className=" bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex sm:gap-5 ">
            <button
              onClick={() => {
                setdropdown(!dropdown);
              }}
              onBlur={()=>{setTimeout(() => {
                setdropdown(false);
              }, 1000);}}
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="text-white
              ty  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5 sm:px-5 sm:py-2.5 text-center inline-flex items-center"
              pe="button"
            >
              <span className="hidden sm:block">Welcome, {session.user.name}! 🫡</span>
              <span className="sm:hidden block">🫡{session.user.name.split(" ").map((word) => word[0]).join(" ")}</span>
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            
            <div
              id="dropdownHover"
              className={`z-10 ${
                dropdown ? "" : "hidden"
              } absolute right-8 top-16 w-52 bg-white divide-y divide-gray-200 rounded-lg shadow-md border border-gray-200 `}
            >
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 border-b border-gray-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <span onClick={()=>{signOut()}}className="cursor-pointer block px-4 py-2 hover:bg-gray-100">
                   Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
