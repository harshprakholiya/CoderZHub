import HomeFilters from '@/components/Home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import {
  getQuestions,
  getRecommendedQuestions,
} from '@/lib/actions/question.action';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import Pagination from '@/components/shared/Pagination';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CoderZHub | Home",
  description: "Explore all questions on CoderZHub. Ask a question and get answers from the community.",
};

export default async function Home({ searchParams }: any) {
  const { userId } = auth();

  let result: any;

  if (searchParams?.f === 'recommended') {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams?.q,
        page: searchParams?.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        question: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams?.q,
      filter: searchParams?.f,
      page: searchParams?.page ? +searchParams.page : 1,
    });
  }

  return (
    <main>
      <div className="flex-between gap-4 ">
        <h1 className="sm:h1-bold h2-bold text-invert w-full">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient max-h-[40px] px-4 !text-grey-100 sm:min-h-[46px] sm:px-4 sm:py-3">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          imgSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.question.length > 0 ? (
          result.question.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              clerkId={userId}
            />
          ))
        ) : (
          <NoResult
            title="There’s no Question to show"
            description={`${searchParams.f === 'recommended' ? 'Please interact with others questions to get recommended questions tailored to you 😉' : 'Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved!'}`}
            hasButton={searchParams.f !== 'recommended'}
            btnText="Ask a Question"
            btnLink="/ask-question"
          />
        )}
      </div>
      <div className="mt-10 w-full items-center">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </main>
  );
}
