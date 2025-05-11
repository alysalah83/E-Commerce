"use client";

import { useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

function ListWindowTap({ allLinks }) {
  const [isWindowHovered, setIsWindowHovered] = useState(false);

  const Icon = isWindowHovered
    ? MdOutlineKeyboardArrowUp
    : MdOutlineKeyboardArrowDown;

  return (
    <li
      onMouseEnter={() => setIsWindowHovered(true)}
      onMouseLeave={() => setIsWindowHovered(false)}
      className="group relative cursor-pointer transition duration-300 hover:text-blue-800"
    >
      <div className="flex items-center gap-1">
        <span>Pages</span>
        <span>
          <Icon className="hover:fill-blue-600" />
        </span>
      </div>
      <div className="invisible absolute -bottom-3 left-0 z-50 min-w-40 -translate-x-1/4 translate-y-full rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:bottom-0 group-hover:opacity-100">
        <menu className="flex flex-col font-medium">
          {allLinks.map((link) => (
            <WindowLink link={link} key={`windowLink-${link.href}`} />
          ))}
        </menu>
      </div>
    </li>
  );
}

function WindowLink({ link }) {
  const { label, href } = link;

  return (
    <li className="px-8 py-2 text-sm font-medium text-gray-500 transition duration-300 hover:bg-gray-200/40 hover:text-blue-600">
      <Link href={href}>{label}</Link>
    </li>
  );
}

export default ListWindowTap;
