import Question from '@/components/forms/Question';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CoderZHub | Edit Question",
  description: "Edit a question.",
};

const page = async ({ params }: any) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });
  return (
    <div>
      <h1 className="text-invert h1-bold">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </div>
  );
};

export default page;
