import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTags from '../RenderTags';

const hotQuestions = [
  {
    _id: '1',
    title: 'How to make a website with React?',
  },
  {
    _id: '2',
    title: 'How do i express as a custom server in Next.js?',
  },
  {
    _id: '3',
    title:
      'Best practices for data fetching in Next.js application with server side rendering?',
  },
  {
    _id: '4',
    title: 'How redux toolkit is different from redux?',
  },
];

const popularTags = [
  {
    _id: '1',
    name: 'React',
    totalQuestions: 100,
  },
  {
    _id: '2',
    name: 'Next.js',
    totalQuestions: 50,
  },
  {
    _id: '3',
    name: 'Redux',
    totalQuestions: 70,
  },
  {
    _id: '4',
    name: 'React-Query',
    totalQuestions: 30,
  },
  {
    _id: '5',
    name: 'TypeScript',
    totalQuestions: 20,
  },
];

const RightSidebar = () => {
  return (
    <section className="dark: custom-scrollbar navbar_lg_background sticky right-0 top-0 flex h-screen w-[320px] flex-col overflow-y-auto border-l-2 p-6 pt-20  shadow-md dark:border-none max-xl:hidden">
      <h3 className="h3-bold text-invert ">Top Question</h3>
      <div className="custom-scrollbar h-1/2 overflow-y-auto">
        <div className="mt-2 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-invert-secondary ">
                {question.title}
              </p>
              <Image
                src="assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="View Question"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-5 h-1/2">
        <h3 className="h3-bold text-invert">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTags
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
