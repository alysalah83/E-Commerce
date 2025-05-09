import Link from "next/link";
import { GoHeart } from "react-icons/go";

function WhitelistNavBtn() {
  return (
    <>
      <Link
        href="/whitelist"
        className="flex cursor-pointer items-center gap-2"
      >
        <GoHeart className="h-6 w-6 text-blue-700" />
        <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
          WhiteList
        </h4>
      </Link>
    </>
  );
}

export default WhitelistNavBtn;
