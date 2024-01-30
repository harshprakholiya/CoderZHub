import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between background-background_paper fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="assets/images/icon.svg"
          height={25}
          width={25}
          alt="CoderZHub"
        />

        <p className="h2-bold font-spaceGrotesk text-black dark:text-white max-sm:hidden">
          CoderZ<span className="primary-text-gradient">Hub</span>
        </p>
      </Link>
      Search
      <div className="flex-between gap-5">
        <SignedIn>
          Theme
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
              variables: {
                colorPrimary: "#007FFF",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
