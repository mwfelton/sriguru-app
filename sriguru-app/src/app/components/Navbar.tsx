"use client"

import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/icons/icon-384x384.png'
import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

    return (
      
      <nav className="fixed w-full h-24 shadow-xl bg-teal-400 sm:px-24">
        <div className='flex justify-between items-center h-full w-full px-4 2Xl:px-16'>
          <Link href='/'>
            <Image
              src={Logo}
              alt='logo'
              height="85"
              className="cursor-pointer"
              priority
            />
          </Link>
          <div className="flex items-center">
          <ul className="hidden sm:flex">
            <Link href='/'>
              <li className="ml-10 uppercase hover:border-b text-xl">
                Banana
              </li>
            </Link>
            <Link href='/'>
              <li className="ml-10 uppercase hover:border-b text-xl">
                BUMS
              </li>
            </Link>
          </ul>
          <div onClick={handleNav} className="cursor-pointer pl-10">
            <FaRegCircleUser size={40} />
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
