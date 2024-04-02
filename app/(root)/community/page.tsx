import UserCard from '@/components/cards/UserCard';
import NoResult from '@/components/shared/NoResult';
import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
const Community = async ({ searchParams }: any) => {
  const result = await getAllUsers({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams?.page ? +searchParams.page : 1,
  });

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

      <div className="flex-center mt-12 flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoResult 
            title="No users found"
            description="We couldn't find any users with the search query"
          />
        )}
      </div>
    </>
  );
};

export default Community;
