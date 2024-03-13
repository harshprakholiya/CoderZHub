'use client';

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';

// eslint-disable-next-line no-unused-vars
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Params {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Voting = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: Params) => {

  
  const [upvoted, setUpvoted] = useState(hasUpvoted);
  const [downvoted, setDownvoted] = useState(hasDownvoted);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [saved, setSaved] = useState(hasSaved)

  console.log(`has upvoted : ${hasUpvoted}`);
  console.log(`has downvoted : ${hasDownvoted}`);
  console.log(`upvotes : ${upvotes}`);
  console.log(`downvotes : ${downvotes}`);
  console.log(`upvote counts : ${upvoteCount}`);
  console.log(`downvote counts : ${downvoteCount}`);
  const pathname = usePathname();
  // const router = useRouter();




  // TODO: add Animation and immediate update of the voting image 
  const handleVote = async (action: string) => {

    if (!userId) {
      return;
    }
    if (action === 'upvote') {
      if(hasDownvoted){
        setDownvoted(false);
        setDownvoteCount(downvoteCount - 1);
      }
      setUpvoted(!upvoted);
      setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      }
      // TODO: show a tost message
      return;
    }

    if (action === 'downvote') {
      if(hasUpvoted){
        setUpvoted(false);
        setUpvoteCount(upvoteCount - 1);
      }
      setDownvoted(!downvoted);
      setDownvoteCount(downvoted ? downvoteCount - 1 : downvoteCount + 1);

      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      }
    }
  };

  //  TODO: complete server action for this function
  const handleSave = async () => {
    setSaved(!saved)
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    })
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-5 ">
        <div className="flex-center gap-1">
          {/* TODO: change color of border of SVG image  */}
          <Image
            src={`${upvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote('upvote')}
          />

          <div className="btn flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-invert-secondary">
              {formatNumber(upvoteCount)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1">
          <Image
            src={`${downvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote('downvote')}
          />

          <div className="btn flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-invert-secondary">
              {formatNumber(downvoteCount)}
            </p>
          </div>
        </div>
      </div>

      { type === 'Question' && (
        <Image
          src={`${saved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-blue.svg'}`}
          alt="downvote"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )
      }
    </div>
  );
};

export default Voting;
