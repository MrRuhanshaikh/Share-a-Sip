import React from "react";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav>
      <ul className="px-6 py-3  text-white backdrop-blur-md opacity-80 flex justify-between items-center">
        <div className="logo flex items-center sm:text-xl font-bold">
          <span className="hidden sm:block">
            <li>
              <span className="text-2xl sm:text-3xl bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text text-transparent ">
                S
              </span>
              hare a
              <span
                className="border-b border-transparent text-xl sm:text-2xl "
                style={{
                  borderImage: "linear-gradient(to right, #38bdf8, #34d399) 1",
                }}
              >
                Sip
              </span>
            </li>
          </span>
          <li>
          <Image
              src="/favicon.ico"
              width={30}
              height={30}
              alt="Picture of the author"
              className="hidden sm:block"
            />
            <Image
              src="/icon.png"
              width={30}
              height={30}
              alt="Picture of the author"
              className="sm:hidden"
            />
          </li>
        </div>
        <div className="flex sm:gap-5 ">
          <li className="hover:bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "><Link href='#home'>Home</Link></li>
          <li className=" hover:bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"><Link href="#about-us">About us</Link></li>
          <button className=" hover:bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
