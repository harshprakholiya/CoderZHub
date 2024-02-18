'use client';

import Image from 'next/image';
import React from 'react';
import { Input } from '../../ui/input';

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
        value=""
        onChange={() => {}}
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
