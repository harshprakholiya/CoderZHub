import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProfileParams {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileParams) => {
  return (
    <div className="flex-center gap-1 ">
      <Image src={imgUrl} alt="icon" height={20} width={20} />

      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-primary-main"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-invert-secondary">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
