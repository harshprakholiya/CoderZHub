import Link from 'next/link';
import React from 'react';
import RenderTags from '../shared/RenderTags';
import Metric from '../shared/Metric';
import { formatNumber, getTimeStamps } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';
interface questionCardProps {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: [];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

// TODO: add clerkId params to all QuestionCard

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: questionCardProps) => {
  const showActionButton = clerkId && clerkId === author.clerkId;



  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-invert line-clamp-1 flex sm:hidden">
            {getTimeStamps(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-invert line-clamp-1 flex-1 ">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButton && (
            <div>
              <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
            </div>
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 ">
        {tags.map((tag) => (
          <RenderTags key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          // imgUrl='/assets/icons/avatar.svg'
          alt="avatar"
          title={` - asked ${getTimeStamps(createdAt)}`}
          textStyles="body-medium card-text-invert-secondary"
          href={`/profile/${author.clerkId}`}
          isAuthor
          value={author.name}
        />
        <div className="flex-sm:justify-start flex items-center gap-3 max-sm:flex-wrap">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            title="Votes"
            textStyles="small-medium card-text-invert-secondary"
            value={upvotes.length === 0 ? '0' : formatNumber(upvotes.length)}
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            title="Answers"
            textStyles="small-medium card-text-invert-secondary"
            value={answers.length === 0 ? '0' : formatNumber(answers.length)}
            href={`/question/${_id}`}
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            title="Views"
            textStyles="small-medium card-text-invert-secondary"
            value={views === 0 ? '0' : formatNumber(views)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
