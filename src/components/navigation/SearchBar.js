"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchPanel from "./SearchPanel";

function SearchBar() {
  const [openSearchPanel, setOpenSearchPanel] = useState(false);

  const handleToggleSearchPanel = () => setOpenSearchPanel((cur) => !cur);

  return (
    <search>
      <form className="group flex w-full max-w-2xs transform items-center justify-between rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 ring-blue-950 ring-offset-[-1] duration-300 focus-within:ring-1 sm:max-w-sm md:max-w-md lg:max-w-sm lg:rounded-md">
        <input
          type="search"
          placeholder="I am shopping for..."
          className="flex-1 text-sm outline-0 sm:text-base"
          disabled={openSearchPanel}
          onFocus={handleToggleSearchPanel}
        />
        <button
          className="flex items-center justify-center outline-0"
          onClick={(e) => e.preventDefault()}
        >
          <CiSearch className="h-5 w-5 fill-slate-400 sm:h-6 sm:w-6" />
        </button>
        {openSearchPanel && (
          <SearchPanel
            handleToggleVisibility={handleToggleSearchPanel}
            visible={openSearchPanel}
          />
        )}
      </form>
    </search>
  );
}

export default SearchBar;
