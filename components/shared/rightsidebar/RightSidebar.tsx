import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RenderTags from '../RenderTags';
import { getHotQuestions } from '@/lib/actions/question.action';
import { getPopularTags } from '@/lib/actions/tag.actions';


const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();

  return (
    <section className="dark: custom-scrollbar navbar_lg_background sticky right-0 top-0 flex h-screen w-[320px] flex-col overflow-y-auto border-l-2 p-6 pt-20  shadow-md dark:border-none max-xl:hidden">
      <h3 className="h3-bold text-invert ">Top Question</h3>
      <div className="custom-scrollbar h-1/2 overflow-y-auto">
        <div className="mt-2 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className=" line-clamp-1 flex cursor-pointer items-center justify-between gap-7"
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
