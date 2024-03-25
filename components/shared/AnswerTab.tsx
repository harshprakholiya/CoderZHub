import { getUserAnswers } from '@/lib/actions/user.action';
import AnswerCard from '../cards/AnswerCard';
import NoResult from './NoResult';
import Pagination from './Pagination';

interface Props {
  searchParams: any;
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  // TODO: Add btnLink url (unanswered question)

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {result.totalAnswers > 0 ? (
        result.answers.map((item) => (
          <AnswerCard
            key={item._id}
            clerkId={clerkId}
            _id={item._id}
            question={item.question}
            author={item.author}
            upvotes={item.upvotes.length}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="You didn't answer any questions yet."
          description="You haven't answered any questions yet. Answer a Question and kickstart the discussion. Your answer could be the next big thing others learn from. Get involved! 💡"
          hasButton={true}
          btnText="Answer a Question"
          btnLink="/"
        />
      )}
      <div className="mt-10 w-full items-center">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </div>
  );
};

export default AnswerTab;
