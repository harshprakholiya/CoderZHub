import HomeFilters from '@/components/Home/HomeFilters';
import NoResult from '@/components/Home/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import { HomePageFilters } from '@/constants/filters';
import Link from 'next/link';

const questions = [
  {
    _id: '1',
    title: 'How to create a new project in Next.js?',
    tags: [
      { _id: '1', name: 'Next.js' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '1',
      name: 'Harsh Rakholiya',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 102356,
    views: 2000000,
    answers: [{}, {}, {}, {}, {}],
    createdAt: new Date('2024-09-01T00:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'How to create a new project in Next.js?',
    tags: [
      { _id: '1', name: 'Next.js' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '3',
      name: 'Harsh Rakholiya',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 10,
    views: 20,
    answers: [{}, {}, {}, {}, {}],
    createdAt: new Date('2021-09-01T00:00:00.000Z'),
  },
  {
    _id: '4',
    title: 'How to create a new project in Next.js?',
    tags: [
      { _id: '1', name: 'Next.js' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '5',
      name: 'Harsh Rakholiya',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 10,
    views: 20,
    answers: [{}, {}, {}, {}, {}],
    createdAt: new Date('2021-09-01T00:00:00.000Z'),
  },
  {
    _id: '6',
    title: 'How to create a new project in Next.js?',
    tags: [
      { _id: '1', name: 'Next.js' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '1',
      name: 'Harsh Rakholiya',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 10,
    views: 20,
    answers: [{}, {}, {}, {}, {}],
    createdAt: new Date('2021-09-01T00:00:00.000Z'),
  },
  {
    _id: '7',
    title: 'How to create a new project in Next.js?',
    tags: [
      { _id: '1', name: 'Next.js' },
      { _id: '2', name: 'React' },
    ],
    author: {
      _id: '1',
      name: 'Harsh Rakholiya',
      picture: '/assets/icons/avatar.svg',
    },
    upvotes: 10,
    views: 20,
    answers: [{}, {}, {}, {}, {}],
    createdAt: new Date('2021-09-01T00:00:00.000Z'),
  },
];

export default function Home() {
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
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key="question._id"
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
          <NoResult />
        )}
      </div>
    </main>
  );
}
