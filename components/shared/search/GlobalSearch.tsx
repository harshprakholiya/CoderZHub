import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
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
          placeholder="Search"
          className="paragraph-regular no-focus search_background border-none text-gray-600 shadow-none dark:text-gray-400"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
