'use client';

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const [saved, setSaved] = useState(hasSaved);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // TODO: add Animation and immediate update of the voting image
  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }
    if (action === 'upvote') {
      if (hasDownvoted) {
        setDownvoted(false);
        setDownvoteCount(downvoteCount - 1);
      }
      setUpvoted(!upvoted);
      setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
      if (type === 'Question') {
        setIsSubmitting(true);
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
        setIsSubmitting(false);
      } else if (type === 'Answer') {
        setIsSubmitting(true);
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
        setIsSubmitting(false);
      }
      // TODO: show a tost message
      return;
    }

    if (action === 'downvote') {
      if (hasUpvoted) {
        setUpvoted(false);
        setUpvoteCount(upvoteCount - 1);
      }
      setDownvoted(!downvoted);
      setDownvoteCount(downvoted ? downvoteCount - 1 : downvoteCount + 1);

      if (type === 'Question') {
        setIsSubmitting(true);
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
        setIsSubmitting(false);
      } else if (type === 'Answer') {
        setIsSubmitting(true);
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
        setIsSubmitting(false);
      }
    }
  };

  const handleSave = async () => {
    setSaved(!saved);
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-5 ">
        <div className="flex-center">
          {/* TODO: change color of border of SVG image  */}

          <Image
            src={`${upvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => (isSubmitting ? null : handleVote('upvote'))}
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
            onClick={() => (isSubmitting ? null : handleVote('downvote'))}
          />
          <div className="btn flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-invert-secondary">
              {formatNumber(downvoteCount)}
            </p>
          </div>
        </div>
      </div>

      {type === 'Question' && (
        <Image
          src={`${saved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-blue.svg'}`}
          alt="downvote"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Voting;
