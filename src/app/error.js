"use client";

import PageHeader from "../components/common/PageHeader";
import { GrPowerReset } from "react-icons/gr";

function error({ error, reset }) {
  return (
    <>
      <PageHeader heading="Error" />
      <div className="bg-gray-100 px-8 py-16">
        <div className="mx-auto flex w-fit max-w-7xl flex-col items-center justify-center gap-8 rounded-xl bg-white p-12 px-8 shadow-sm lg:px-24">
          <h2 className="text-6xl font-bold tracking-wide text-blue-600">
            Error
          </h2>
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-center text-2xl font-semibold tracking-wide text-blue-950 capitalize">
              something went wrong on the page please try again
            </h3>
            <p className="text-center text-lg text-gray-500">
              Error Message: {error.message}
            </p>
          </div>
          <button
            onClick={reset}
            className="flex cursor-pointer items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            <span>
              <GrPowerReset className="h-4 w-4" />
            </span>
            <span className="capitalize">Try again</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default error;
