'use client';

import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

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


  const handleVote = async (action: string) => {

  };

  
//  TODO: complete server action for this function 
  const handleSave = async () => {

  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-5 ">
        <div className="flex-center gap-1">
          {/* TODO: change color of border of SVG image  */}
          <Image
            src={`${hasUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}`}
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote('upvote')}
          />

          <div className="btn flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-invert-secondary">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1">
          <Image
            src={`${hasUpvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}`}
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote('downvote')}
          />

          <div className="btn flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-invert-secondary">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
      </div>
      <Image
        src={`${hasSaved ? '/assets/icons/star-filed.svg' : '/assets/icons/star-blue.svg'}`}
        alt="downvote"
        width={18}
        height={18}
        className="cursor-pointer"
        onClick={() => handleSave()}
      />
    </div>
  );
};

export default Voting;
