import Link from 'next/link';
import React from 'react';
import RenderTags from '../shared/RenderTags';
import Metric from '../shared/Metric';
import { formatNumber, getTimeStamps } from '@/lib/utils';
interface questionCardProps {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: questionCardProps) => {
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

        {/* if logged in add Edit delete button */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2 ">
        {tags.map((tag) => (
          <RenderTags key={tag._id} name={tag.name} _id={tag._id} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="avatar"
          title={` - asked ${getTimeStamps(createdAt)}`}
          textStyles="body-medium card-text-invert-secondary"
          href={`/profile/${author._id}`}
          isAuthor
          value={author.name}
        />
        
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          title="Votes"
          textStyles="small-medium card-text-invert-secondary"
          value={formatNumber(upvotes)}
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          title="Answers"
          textStyles="small-medium card-text-invert-secondary"
          value={formatNumber(answers.length)}
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          title="Views"
          textStyles="small-medium card-text-invert-secondary"
          value={formatNumber(views)}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
