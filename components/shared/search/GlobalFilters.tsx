'use client';

import { Button } from '@/components/ui/button';
import { GlobalSearchFilters } from '@/constants/filters';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get('type');

  const [active, setActive] = useState(typeParams || 'question');

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive('');
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'type',
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-invert-secondary body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <Button
            key={item.value}
            type="button"
            className={`btn small-medium text-invert rounded-3xl bg-grey-200 px-5 py-0.5 capitalize duration-100 hover:text-primary-500
              ${active === item.value ? 'primary-gradient hover:text-white' : ''}
            `}
            onClick={() => handleTypeClick(item.value)}
          >
            {' '}
            {item.name}{' '}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
