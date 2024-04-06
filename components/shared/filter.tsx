'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface filterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: filterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();


  const paramsFilters = searchParams.get('f');

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value,
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={paramsFilters || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular filter_background border px-5 py-2.5 text-gray-400`}
        >
          <div className=" line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Filter"/>
          </div>
        </SelectTrigger>
        <SelectContent className="text-invert gap-3 border-none">
          <SelectGroup className="background-bg_white_dark-primary800">
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer gap-1 p-2 hover:outline-none"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
