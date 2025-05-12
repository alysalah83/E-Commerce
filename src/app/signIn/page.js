import Logo from "@/src/components/navigation/Logo";
import googleLogo from "@/public/Logo-google-icon-PNG.png";
import Image from "next/image";
import PageHeader from "@/src/components/common/PageHeader";
import { signInAction } from "@/src/lib/actions";

export const metadata = {
  title: "sign in",
};

function page() {
  return (
    <>
      <PageHeader heading="Sign in" />
      <main className="bg-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-center py-24">
          <div className="flex flex-col items-center gap-12 rounded-lg bg-white px-12 py-12 shadow-md">
            <Logo />
            <form action={signInAction}>
              <button className="flex cursor-pointer items-center gap-5 rounded-full bg-gray-200 px-6 py-3 shadow-md transition duration-300 hover:-scale-[1.01]">
                <Image
                  src={googleLogo}
                  width={35}
                  height={35}
                  alt="google logo "
                />
                <span className="text-lg font-semibold text-gray-800">
                  Sign in with Google
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
