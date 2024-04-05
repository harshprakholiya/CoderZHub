'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import GlobalFilters from './GlobalFilters';
import { globalSearch } from '@/lib/actions/general.action';

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

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
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-grey-50 py-5 shadow-lg dark:bg-primaryDark-800">
      <GlobalFilters />
      <div className="my-5 h-[1px] bg-primary-500 " />

      <div className="space-y-5">
        <p className="text-invert paragraph-semibold px-5">Top Match</p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <Image
              src="/assets/animation/loading-animation.svg"
              alt="loading animation"
              width={50}
              height={50}
            />
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
                    src={
                      item.type === 'tag'
                        ? '/assets/icons/tag.svg'
                        : item.type === 'question'
                          ? '/assets/icons/question.svg'
                          : item.type === 'answer'
                            ? '/assets/icons/answer.svg'
                            : item.type === 'user'
                              ? '/assets/icons/user.svg'
                              : '/assets/icons/tag.svg'
                    }
                    alt="icon"
                    height={18}
                    width={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-invert line-clamp-1">
                      {item.title}
                    </p>
                    <p className="small-medium text-invert-3 mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-[50px]">🧐</p>

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
