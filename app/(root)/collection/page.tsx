import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { QuestionFilters } from '@/constants/filters';
import { getSavedQuestions } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { userId } = auth();
  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
  });
  return (
    <main>
      <h1 className="sm:h1-bold h2-bold text-invert w-full">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          imgSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.question.length > 0 ? (
          result.question.map((question) => (
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
            />
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
              There’s no saved Question to show
            </h2>
            <p className="body-regular text-invert-secondary mt-3.5 max-w-md text-center">
              Looks like you don&apos;t have any saved questions right now. Save
              questions to revisit them whenever you want!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
