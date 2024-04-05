'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import GlobalResult from './GlobalResult';

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  const query = searchParam.get('q');

  const [search, setSearch] = useState(query || '');
  const [isOpen, setIsOpen] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handelOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };
    setIsOpen(false);
    document.addEventListener('click', handelOutsideClick);

    return () => {
      document.removeEventListener('click', handelOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: 'global',
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (!query) {
          const newUrl = removeKeysFromQuery({
            params: searchParam.toString(),
            keys: ['global', 'type'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParam, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="search_background relative flex min-h-[48px] items-center gap-1 rounded-xl border-red-500 px-4 ">
        <Image
          src="/assets/icons/search.svg"
          width={20}
          height={20}
          alt="Search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === '' && isOpen) {
              setIsOpen(false);
            }
          }}
          placeholder="Search"
          className="paragraph-regular no-focus search_background border-none text-gray-600 shadow-none dark:text-gray-400"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
