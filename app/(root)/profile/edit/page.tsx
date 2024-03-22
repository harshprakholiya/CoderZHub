import Profile from '@/components/forms/Profile';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';

const Page = async ({ params }: any) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  // const result = await getQuestionById({ questionId: params.id });
  return (
    <div>
      <h1 className="text-invert h1-bold">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default Page;
