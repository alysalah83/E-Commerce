import { CiSearch } from "react-icons/ci";

function SearchBar() {
  return (
    <search>
      <form className="group flex w-full max-w-2xs transform items-center justify-between rounded-sm border border-slate-200 bg-slate-100 px-4 py-3 ring-blue-950 ring-offset-[-1] duration-300 focus-within:ring-1 sm:max-w-sm md:max-w-md lg:max-w-sm lg:rounded-md">
        <input
          type="search"
          placeholder="I am shopping for..."
          className="flex-1 text-sm outline-0 sm:text-base"
        />
        <button className="flex items-center justify-center outline-0">
          <CiSearch className="h-5 w-5 fill-slate-400 sm:h-6 sm:w-6" />
        </button>
      </form>
    </search>
  );
}

export default SearchBar;
