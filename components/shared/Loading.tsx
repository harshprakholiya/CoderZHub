import Image from 'next/image';
interface Params {
  title?: string;
}

const Loading = ({ title }: Params) => {
  return (
    <div className="flex-center fixed left-0 top-0 z-50 h-full w-full flex-col items-center justify-center backdrop-blur-sm">
      <Image
        src="/assets/animation/loading-animation.svg"
        alt="Loading"
        width={100}
        height={100}
      />
      <p className="body-medium text-invert">{title ? `${title}` : ''}</p>
    </div>
  );
};

export default Loading;
