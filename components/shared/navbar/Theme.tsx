'use client';
import React from 'react';
import { useTheme } from '@/context/themeProvider';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { themes } from '@/constants';

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <div>
      <Menubar className="relative border-none bg-transparent shadow-none">
        <MenubarMenu>
        

          <MenubarTrigger className="cursor-pointer">
            {mode === 'light' ? (
              <Image
                src="/assets/icons/sun.svg"
                alt="Light Mode"
                height={20}
                width={20}
              />
            ) : (
              <Image
                src="/assets/icons/moon.svg"
                alt="Light Mode"
                height={20}
                width={20}
              />
            )}
          </MenubarTrigger>
          <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[150px] border bg-white py-2 dark:border-none dark:bg-primaryDark-800">
            {themes.map((item) => (

              <MenubarItem
                key={item.value}
                className="flex cursor-pointer items-center gap-4 rounded-md px-2.5 py-2 transition-all duration-300 ease-in-out hover:bg-grey-50 dark:bg-primaryDark-800 dark:hover:bg-primaryDark-700"
                onClick={() => {
                  setMode(item.value);
                  if (item.value !== 'system') {
                    localStorage.theme = item.value;
                  } else {
                    localStorage.removeItem('theme');
                  }
                }}
                >
                <Image
                  src={
                    item.value === mode
                    ? item.activeIcon
                    : mode === 'dark'
                    ? item.lightIcon
                    : item.darkIcon
                  }
                  alt={item.value}
                  width={16}
                  height={16}
                  />
                <p
                  className={`body-semibold text-primaryDark-100 ${mode === item.value ? 'primary-text-gradient' : mode === 'light' ? 'text-primaryDark-400' : 'text-primaryDark-100'} `}
                  >
                  {item.label}
                </p>
              </MenubarItem>

            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Theme;
