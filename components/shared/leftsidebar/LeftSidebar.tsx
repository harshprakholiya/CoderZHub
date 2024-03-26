'use client';

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedOut, useAuth } from '@clerk/nextjs';

const LeftSidebar = () => {
  const pathName = usePathname();
  const { userId } = useAuth();
 
  return (
    <section className="dark: custom-scrollbar navbar_lg_background sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r-2 p-6 pt-5 shadow-md  dark:border-none max-sm:hidden lg:w-[266px]">
      <div className=" flex h-full flex-col gap-4 pt-16">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length < 0) ||
            pathName === item.route;

          if (item.route === '/profile') {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              href={item.route}
              className={`${isActive ? 'primary-gradient rounded-lg text-white ' : 'text-invert rounded-lg hover:bg-primaryDark-100 dark:hover:bg-primaryDark-600'} flex items-center justify-start gap-4 bg-transparent p-3 duration-150 ease-in-out`}
              key={item.route}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p
                className={` max-lg:hidden ${isActive ? 'body-medium' : 'body-regular'}`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <SignedOut>
        <div className="mt-[20px] flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="body-medium btn-primary min-h-[41px] w-full rounded-lg  py-3 shadow-none ">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log in
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="body-medium btn-primary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="text-invert max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
