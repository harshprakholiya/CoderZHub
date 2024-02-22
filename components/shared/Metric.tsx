import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
interface metricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  title,
  value,
  textStyles,
  href,
  isAuthor,
}: metricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={` object-contain ${href ? ' rounded-full' : ''}`}
      />
      <p
        className={`flex cursor-default items-center gap-1 ${textStyles} ${href ? 'cursor-pointer' : ''}`}
      >
        {value}

        <span
          className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}
        >
          {title}
        </span>
      </p>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
