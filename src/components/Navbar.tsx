"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/nav-logo.png";
import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed w-full h-24 shadow-xl bg-crystal_blue sm:px-24">
      <div className="flex justify-between items-center h-full w-full px-4 2Xl:px-16">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            height="60"
            className="cursor-pointer"
            priority
          />
        </Link>
        <div className="flex items-center">
          <ul className="hidden md:flex">
            <Link href="/learn-online">
              <li className="ml-10 uppercase hover:border-b text-xl">Learn</li>
            </Link>
            <Link href="/practice-tracker">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Practice Tracker
              </li>
            </Link>
            <Link href="/practice-timer">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Kriya Timer
              </li>
            </Link>
          </ul>
          <div className="cursor-pointer pl-10">
            {session ? (
              <Link href="/dashboard">
                <FaRegCircleUser size={40} className="text-seashell" />
              </Link>
            ) : (
              <div className="flex list-none gap-4">
                <Link href="/sign-in">
                  <button className="bg-seashell hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Log in
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-seashell hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
