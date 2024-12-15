import { ModeToggle } from "@/components/global/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user?: null | User;
};

const Navigation = async (user: Props) => {
  const authUser = await currentUser();
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-[50] bg-transparent">
      <aside className="flex items-center gap-2">
        <Link href={"/"} className="flex items-center">
          <Image
            src={"./assets/plura-logo.svg"}
            width={40}
            height={40}
            alt="Plura logo"
          />
          <span className="text-xl font-bold">Plura.</span>
        </Link>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <Link
              href="#pricing"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="#features"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#testimonials"
              className="text-white hover:text-primary transition duration-300 ease-in-out"
            >
              Testimonials
            </Link>
          </li>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        {authUser ? (
          <Link
            href="/agency"
            className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 transition"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/agency"
            className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80 transition"
          >
            Sign in
          </Link>
        )}
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
