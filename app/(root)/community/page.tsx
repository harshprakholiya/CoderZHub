import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import Image from 'next/image';
import Link from 'next/link';
const Community = async () => {
  
  const result = await getAllUsers({});

  return (
    <>
      <h1 className="sm:h1-bold h2-bold text-invert w-full font-inter">
        All Users
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
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard key={user._id} user={user} /> 
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
              There’s no Question to show
            </h2>
            <p className="body-regular text-invert-secondary mt-3.5 max-w-md text-center">
              Be the first to Join and break the silence! 🚀 Ask a Question and
              kickstart the discussion. our query could be the next big thing
              others learn from. Get involved! 💡
            </p>

            <Link href="/ask-question">
              <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg text-white hover:bg-primary-700">
                Sign-up now
              </Button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Community;
