"use client"

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/images/nav-logo.png'
import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

    return (
      <nav className="fixed w-full h-24 shadow-xl bg-crystal_blue sm:px-24">
        <div className='flex justify-between items-center h-full w-full px-4 2Xl:px-16'>
          <Link href='/'>
            <Image
              src={Logo}
              alt='logo'
              height="60"
              className="cursor-pointer"
              priority
            />
          </Link>
          <div className="flex items-center">
          <ul className="hidden md:flex">
            <Link href='/pages/learn-online'>
              <li className="ml-10 uppercase hover:border-b text-xl">
                Learn
              </li>
            </Link>
            <Link href='/pages/practice-tracker'>
              <li className="ml-10 uppercase hover:border-b text-xl">
                Practice Tracker
              </li>
            </Link>
            <Link href='/pages/practice-timer'>
              <li className="ml-10 uppercase hover:border-b text-xl">
                Kriya Timer
              </li>
            </Link>
          </ul>
          <div className="cursor-pointer pl-10">
            <Link href='/pages/user-page'>
            <FaRegCircleUser size={40} className="text-seashell" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
