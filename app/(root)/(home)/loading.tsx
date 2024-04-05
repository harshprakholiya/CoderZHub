import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <main>
      <div className="flex-between gap-4 ">
        <h1 className="sm:h1-bold h2-bold text-invert w-full">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient max-h-[40px] px-4 !text-grey-100 sm:min-h-[46px] sm:px-4 sm:py-3">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="min-h-[56px] sm:min-w-[170px]" />
        </div>
      </div>
      
      <div className="my-10 hidden flex-wrap gap-3 md:flex">
        <Skeleton className="h-9 w-24 rounded" />
        <Skeleton className="h-9 w-24 rounded" />
        <Skeleton className="h-9 w-24 rounded" />
        <Skeleton className="h-9 w-24 rounded" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </main>
  );
};

export default loading;
