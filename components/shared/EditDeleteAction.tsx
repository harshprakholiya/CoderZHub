'use client';

import { deleteAnswer } from '@/lib/actions/answer.action';
import { deleteQuestion } from '@/lib/actions/question.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Loading from './Loading';
import { useState } from 'react';

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  
  const pathname = usePathname();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handelEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  const handelDelete = async () => {
    setIsDeleting(true);
    if (type === 'Question') {
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname,  });
    } else if (type === 'Answer') {
      await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
    }
    setIsDeleting(false);
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {isDeleting && <Loading title="Deleting question..." />}
      {type === 'Question' && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={() => handelEdit()}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={() => handelDelete()}
      />
    </div>
  );
};

export default EditDeleteAction;
