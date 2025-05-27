import { auth } from "@/src/auth";
import AccountForm from "@/src/components/account/AccountForm";
import { getUserById } from "@/src/lib/data-service";

export const metadata = {
  title: "Account",
};

async function page() {
  const session = await auth();
  const userData = await getUserById(session.user.userId);

  return (
    <main className="w-full bg-gray-100 px-6 py-24 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center">
        <div className="min-w-3/4 rounded-xl bg-white p-10 shadow-md xl:min-w-2xl">
          <h1 className="border-b border-gray-200 pb-8 text-2xl font-bold tracking-wide text-gray-600">
            Update Your User Setting
          </h1>
          <AccountForm session={session} userData={userData} />
        </div>
      </div>
    </main>
  );
}

export default page;
