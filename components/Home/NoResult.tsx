import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const NoResult = () => {
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
        There’s no Question to show
      </h2>
      <p className="body-regular text-invert-secondary mt-3.5 max-w-md text-center">
        Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡
      </p>

      <Link href="/ask-question">
        <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg text-white hover:bg-primary-700">
          Ask a Question
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
