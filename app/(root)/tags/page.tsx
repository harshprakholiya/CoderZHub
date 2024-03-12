import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.actions';
import Image from 'next/image';
import Link from 'next/link';

const Tags = async () => {
  const result = await getAllTags({});

  return (
    <>
      <h1 className="sm:h1-bold h2-bold text-invert w-full font-inter">
        All Tags
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          imgSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search for users"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="flex-center mt-12 flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className=" rounded-2xl shadow-sm"
            >
              <div className="card-wrapper flex w-full flex-col items-center rounded-2xl border px-5 py-10 sm:w-[260px] ">
                <div className="w-fit rounded-sm border !border-primary-400 px-5 py-1.5 text-primary-700 dark:text-primary-300">
                  <p className="small-regular uppercase ">{tag.name}</p>
                </div>
                <p className="small-medium text-invert-3 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>
                  Questions
                </p>
              </div>
            </Link>
          ))
        ) : (
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
              There’s no Tags to show
            </h2>
            <p className="body-regular text-invert-secondary mt-3.5 max-w-md text-center">
              There are no Tags yet. Be the first to create a Tag by asking
              question
            </p>

            <Link href="/ask-question">
              <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg text-white hover:bg-primary-700">
                Ask QUestion
              </Button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Tags;
