"use client";

import { signOutAction } from "@/src/lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useState } from "react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import MiniLoader from "../common/MiniLoader";
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from "react-icons/ri";

function AccountSideNav() {
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);

  const handleToggleSideBar = () => setIsSideBarOpened((cur) => !cur);
  const sideBarIconClasses = "h-6 w-6 text-blue-600";

  const nav = [
    { label: "Account Setting", href: "/account/settings" },
    { label: "Add Product", href: "/account/addProduct" },
  ];

  return (
    <div className="relative">
      <nav
        className={`fixed top-0 left-0 z-40 h-screen min-w-72 bg-white pt-10 shadow-2xl transition duration-300 ease-out sm:min-w-80 lg:static lg:h-full lg:min-w-72 lg:translate-x-0 lg:border-y-4 lg:border-gray-100 lg:shadow-none ${isSideBarOpened ? "translate-x-0" : "-translate-x-full"}`}
      >
        <menu className="flex h-full flex-col gap-5">
          {nav.map((item) => (
            <NavList item={item} key={item.href} />
          ))}
          <li className="mt-auto">
            <SignOutButton />
          </li>
        </menu>
        <button
          onClick={handleToggleSideBar}
          className="absolute top-1/2 -right-12 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-blue-100 p-2 shadow-2xl lg:hidden"
          aria-label={
            isSideBarOpened ? "close sidebar menu" : "open sidebar menu"
          }
        >
          {isSideBarOpened ? (
            <RiMenuUnfold4Line className={sideBarIconClasses} />
          ) : (
            <RiMenuUnfold3Line className={sideBarIconClasses} />
          )}
        </button>
      </nav>
      {isSideBarOpened && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={handleToggleSideBar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function NavList({ item }) {
  const pathname = usePathname();
  const { label, href } = item;

  const isActive = pathname === href;

  return (
    <Link href={href}>
      <li
        className={`px-16 py-4 font-medium tracking-wide transition duration-300 ${isActive ? "bg-gray-100 text-blue-600" : "bg-white text-gray-600"} hover:bg-gray-100 hover:text-blue-600`}
      >
        {label}
      </li>
    </Link>
  );
}

function SignOutButton() {
  const [_, action, isPending] = useActionState(signOutAction, null);

  return (
    <form action={action}>
      <button
        disabled={isPending}
        className="flex w-full cursor-pointer items-center gap-2 px-16 py-4 font-medium text-red-500 transition duration-300 hover:text-red-700 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <span className="mx-auto">
            <MiniLoader />
          </span>
        ) : (
          <>
            <LiaSignOutAltSolid className="h-5 w-5" />
            <span>Sign out</span>
          </>
        )}
      </button>
    </form>
  );
}

export default AccountSideNav;
