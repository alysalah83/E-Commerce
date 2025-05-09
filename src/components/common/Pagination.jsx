"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Pagination({
  totalItems,
  itemsPerPage = 9,
  delta = 2,
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const params = new URLSearchParams(searchParams);

  const handlePagination = (page) => {
    params.set("page", page);
    push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  if (totalPages <= 1) return null;

  if (currentPage > totalPages || currentPage < 1) {
    handlePagination(Math.min(Math.max(1, currentPage), totalPages));
    return null;
  }

  const getPaginationRange = () => {
    const range = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    if (left <= 1)
      for (let i = 1; i <= Math.min(totalPages, right); i++) range.push(i);
    else {
      range.push(1);
      if (left > 2) range.push("...");

      for (let i = left; i <= Math.min(totalPages, right); i++) range.push(i);
    }

    if (right < totalPages - 1) range.push("...");

    if (right < totalPages) range.push(totalPages);

    if (currentPage === 1 && totalPages === 2) return [1, 2];

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex justify-center">
      <div className="flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
        <NavButton
          direction="prev"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {paginationRange.map((item, index) => {
          if (item === "...") return <Ellipsis key={`ellipsis-${index}`} />;

          return (
            <PageButton
              key={`page-${item}`}
              page={item}
              currentPage={currentPage}
              onClick={handlePagination}
            />
          );
        })}

        <NavButton
          direction="next"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
}

function PageButton({ page, currentPage, onClick }) {
  return (
    <button
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors ${
        currentPage === page
          ? "bg-blue-600 text-white"
          : "text-gray-500 hover:bg-gray-100"
      }`}
      onClick={() => onClick(page)}
      aria-label={`Go to page ${page}`}
    >
      {page}
    </button>
  );
}

function NavButton({ direction, onClick, disabled }) {
  const Icon = direction === "prev" ? SlArrowLeft : SlArrowRight;

  return (
    <button
      className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:bg-gray-100"
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} page`}
    >
      <Icon
        className={`h-4 w-4 ${disabled ? "text-gray-400" : "text-gray-600"}`}
      />
    </button>
  );
}

function Ellipsis() {
  return (
    <span className="flex h-9 w-9 items-center justify-center text-gray-400">
      ...
    </span>
  );
}
