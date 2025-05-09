"use client";

function FooterReversedRights() {
  return (
    <small className="text-bold mt-8 block bg-gray-100 px-5 py-4 text-xs text-gray-500 sm:text-center">
      © {new Date().getFullYear()}. All rights reserved by Aly Salah.
    </small>
  );
}

export default FooterReversedRights;
