'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input } from '../../ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

interface CustomInputProps {
  route: string;
  imgSrc: string;
  iconPosition: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchBar = ({
  route,
  imgSrc,
  iconPosition,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  const query = searchParam.get('q');

  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: 'q',
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParam.toString(),
            keys: ['q'],
          });

          router.push(newUrl, { scroll: false });

        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, route, searchParam, router, query]);

  return (
    <div
      className={`search_background flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={20}
          height={20}
          alt="Search"
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus search_background border-none text-gray-600 shadow-none outline-none dark:text-gray-400"
      />

      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={20}
          height={20}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
