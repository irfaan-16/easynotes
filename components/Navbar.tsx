"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import DarkMode from "@/components/DarkMode";
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 backdrop-blur-3xl z-50">
      <Link href="/">
        <div className="flex items-center">
          <Image
            src="/note.png"
            height="80"
            width="80"
            alt="Note logo"
            className="drop-shadow-xl"
          />
          <h2 className="font-bold text-xl tracking-wide	">
            easy<span className="text-green-500">notes</span>
          </h2>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <DarkMode />
        {session?.user != undefined ? (
          <>
            <Image
              src={session.user.image!}
              alt="User profile"
              height={60}
              width={60}
              className="rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
            />
            <Button onClick={() => signOut()} variant={"destructive"}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              className="bg-green-500 font-bold dark:text-white  dark:hover:text-black"
              onClick={() => signIn("google")}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
