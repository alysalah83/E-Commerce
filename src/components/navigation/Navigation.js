import { memo } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import SideBarCart from "@/src/components/cart/SideBarCart";
import CartNavButton from "@/src/components/cart/CartNavButton";
import WhitelistNavBtn from "../whitelist/WhiteListNavBtn";
import SignInButton from "../auth/SignInButton";

function Navigation() {
  return (
    <>
      <nav className="grid grid-rows-[auto_auto_auto] gap-y-10 px-4 py-5 md:px-7 md:py-5 md:pb-0 lg:grid-cols-3 lg:grid-rows-2">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-6 sm:col-span-2 lg:mb-0 lg:w-auto lg:justify-start lg:gap-12">
          <Logo />
          <SearchBar />
        </div>

        <div className="col-span-2 mb-2 md:mb-0 md:border-t md:border-gray-200 md:py-5 lg:col-start-1 lg:col-end-4 lg:py-6">
          <NavLinks />
        </div>

        <div className="col-span-2 row-start-2 row-end-3 ml-4 flex justify-center gap-7 self-center pb-0 md:gap-10 md:border-t md:border-gray-200 md:pt-5 lg:col-start-3 lg:row-start-1 lg:row-end-2 lg:items-center lg:border-0">
          <SignInButton />
          <CartNavButton />
          <WhitelistNavBtn />
        </div>
      </nav>
      <aside>
        <SideBarCart />
      </aside>
    </>
  );
}

export default memo(Navigation);
