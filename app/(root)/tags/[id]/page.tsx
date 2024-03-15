import QuestionCard from '@/components/cards/QuestionCard';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { IQuestion } from '@/database/question.model';
import { getQuestionByTagId } from '@/lib/actions/tag.actions';
import Image from 'next/image';

const Page = async ({ params, searchParams }: any) => {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  console.log(result);

  return (
    <main>
      <h1 className="sm:h1-bold h2-bold text-invert w-full">
        {result.tagTitle}
      </h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          route="/"
          imgSrc="/assets/icons/search.svg"
          iconPosition="left"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
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
};

export default Page;
