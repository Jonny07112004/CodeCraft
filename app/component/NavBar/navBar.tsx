'use client'
import React, { useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi'; // Hamburger and Close icons


const navItems = [
  { name: "Home", href: "/" },
  { name: "Data Structures", href: "./component/Algo_Page" },
  { name: " AI Algorithm", href: "./ai_algorithm/pages/mainpage" },
  { name: "Account", href: "" }
];

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="fixed z-[999] w-full bg-zinc-900 p-10 pb-25 flex justify-between items-center">
      <Logo />

      {/* Hamburger Menu for Small Screens */}
      <div className="sm:hidden cursor-pointer text-white text-3xl" onClick={toggleDrawer}>
        {isDrawerOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Nav Links for Larger Screens */}
      <div className="hidden sm:flex gap-[3vw]">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`text-lg capitalize font-light ${index === 3 ? "ml-20" : ""}`}
          >
            <Link href={item.href}>
              <div className="hover:underline">{item.name}</div>
            </Link>
          </div>
        ))}
      </div>

      {/* Drawer for Small Screens */}
      {isDrawerOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-zinc-800 p-5 flex flex-col gap-6 z-[998] sm:hidden">
          <button className="text-white text-2xl self-end" onClick={toggleDrawer}>
            <FiX />
          </button>
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} onClick={toggleDrawer}>
              <div className="text-white text-lg capitalize hover:underline">{item.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
