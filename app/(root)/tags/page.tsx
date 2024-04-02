import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.actions';
import Link from 'next/link';

const Tags = async ({searchParams}: any) => {
  const result = await getAllTags({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });


  return (
    <>
      <h1 className="sm:h1-bold h2-bold text-invert w-full font-inter">
        All Tags
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route={`/tags`}
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

      <section className="mt-12 flex flex-wrap gap-4">
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
          <NoResult 
            title='There’s no Tags to show'
            description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡'
            hasButton={true}
            btnText='Ask a Question'
            btnLink='/ask-question'
          />
        )}
      </section>

      <div className="mt-10 w-full items-center">
        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result.isNext}/>
      </div>
    </>
  );
};

export default Tags;
