'use client';
import { formUrlQuery } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextNavigation =
      direction === 'prev' ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextNavigation.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation('prev')}
        className={`btn flex min-h-[36px] items-center justify-center gap-2 !border border-grey-400 dark:border-none ${pageNumber === 1 && 'hidden'}`}
      >
        <p className="body-medium text-invert-secondary">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-grey-50">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation('next')}
        className={`btn flex min-h-[36px] items-center justify-center gap-2 !border border-grey-400 dark:border-none ${!isNext && 'hidden'}`}
      >
        <p className="body-medium text-invert-secondary">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
