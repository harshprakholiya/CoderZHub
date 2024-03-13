'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectItem } from '@radix-ui/react-select';

interface filterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: filterProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} body-regular filter_background border px-5 py-2.5 text-gray-400`}
        >
          <div className=" line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Filter" />
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
