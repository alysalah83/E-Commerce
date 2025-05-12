import { auth } from "@/src/auth";
import Image from "next/image";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";

async function SignInButton() {
  const session = await auth();
  const isAuth = !!session?.user?.email;
  let name, image;
  if (isAuth) {
    name = session.user.name;
    image = session.user.image;
  }

  console.log(isAuth);

  return isAuth ? (
    <Link href="/account">
      <div className="flex cursor-pointer items-center gap-2 text-gray-400">
        <Image
          src={image}
          width={30}
          height={30}
          alt={`${name} avatar`}
          className="rounded-full"
        />
        <span className="font-medium">{name}</span>
      </div>
    </Link>
  ) : (
    <Link href="/signIn">
      <button className="flex cursor-pointer items-center gap-2">
        <BsPerson className="h-7 w-7 fill-blue-700" />
        <div className="flex flex-col justify-between">
          <h4 className="text-xs tracking-wider text-gray-400 uppercase">
            account
          </h4>
          <p className="text-start font-semibold capitalize">sign in</p>
        </div>
      </button>
    </Link>
  );
}

export default SignInButton;
