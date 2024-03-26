'use client';
import { useEffect, useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GlobalFilters from './GlobalFilters';
import { globalSearch } from '@/lib/actions/general.action';

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      type: 'question',
      id: '1',
      title: 'How to create a new project?',
    },
    {
      type: 'tag',
      id: '2',
      title: 'ReactJS',
    },
    {
      type: 'user',
      id: '3',
      title: 'Harsh Rakholiya',
    },
    {
      type: 'question',
      id: '4',
      title: 'How to create a new project?',
    },
  ]);

  const global = searchParams.get('global');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        // Fetch global result
        const res = await globalSearch({ query: global, type });
        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch global result');
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return `/question/${id}`;
      case 'answer':
        return `/question/${id}`;
      case 'user':
        return `/profile/${id}`;
      case 'tag':
        return `/tags/${id}`;

      default:
        return '/';
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-grey-50 py-5 shadow-sm dark:bg-gray-800">
      <GlobalFilters />
      <div className="my-5 h-[1px] bg-gray-50/50" />

      <div className="space-y-5">
        <p className="text-invert paragraph-semibold px-5">Top Match</p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <ReloadIcon className="mt-3 h-7 w-7 animate-spin text-primary-400" />
            <p className="paragraph-regular text-invert-secondary mt-5">
              Loading...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  key={item.type + item.id + index}
                  href={renderLink(item.type, item.id)}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tag"
                    height={18}
                    width={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-invert line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-invert-3 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-invert-secondary body-regular px-5 py-2.5">
                  No results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
