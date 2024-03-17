import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface Props {
  title: string;
  description?: string;
  hasButton?: boolean;
  btnText?: string;
  btnLink?: string | null;
}

const NoResult = ({
  title,
  description,
  hasButton,
  btnText,
  btnLink,
}: Props) => {
  return (
    <div className=" flex-center my-10 w-full flex-col">
      <Image
        src="/assets/images/no-questions.svg"
        alt="no Question"
        width={270}
        height={200}
        className="hidden dark:flex"
      />
      <Image
        src="/assets/images/light-no-questions.svg"
        alt="no Question"
        width={270}
        height={200}
        className="dark:hidden"
      />
      <h2
        className="h2-bold
      text-invert mt-8"
      >
        {title}
      </h2>
      <p className="body-regular text-invert-secondary mt-3.5 max-w-md text-center">
        {description}
      </p>
      {hasButton && (
        <Link href={btnLink || '/'}>
          <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg text-white hover:bg-primary-700">
            {btnText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NoResult;
