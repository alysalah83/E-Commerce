"use client";

import { useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

function ListWindowTap({ allLinks }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((cur) => !cur);
  const handleCloseMenu = () => setIsMenuOpen(false);

  const Icon = isMenuOpen
    ? MdOutlineKeyboardArrowUp
    : MdOutlineKeyboardArrowDown;

  return (
    <li
      className={`group relative cursor-pointer transition duration-300 ${isMenuOpen ? "text-blue-800" : ""} hover:text-blue-800`}
    >
      <div
        onClick={handleToggleMenu}
        onPointerEnter={() => setIsMenuOpen(true)}
        onPointerLeave={handleCloseMenu}
        className="flex items-center gap-1"
      >
        <span>Pages</span>
        <span>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div
        className={`absolute left-0 z-50 min-w-40 -translate-x-1/4 translate-y-full rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-300 ${isMenuOpen ? "visible bottom-0 opacity-100" : "invisible -bottom-3 opacity-0"} group-hover:visible group-hover:bottom-0 group-hover:opacity-100`}
      >
        <menu className="flex flex-col font-medium">
          {allLinks.map((link) => (
            <WindowLink
              link={link}
              onClick={handleCloseMenu}
              key={`windowLink-${link.href}`}
            />
          ))}
        </menu>
      </div>
    </li>
  );
}

function WindowLink({ link, onClick }) {
  const { label, href } = link;

  return (
    <Link href={href} onClick={onClick}>
      <li className="px-8 py-2 text-sm font-medium text-gray-500 transition duration-300 hover:bg-gray-200/40 hover:text-blue-600">
        {label}
      </li>
    </Link>
  );
}

export default ListWindowTap;
