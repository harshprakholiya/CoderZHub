import Image from 'next/image';

interface Props {
  imgUrl: string;
  value: number;
  title: string;
}
const StatesCard = ({ imgUrl, value, title }: Props) => {
  return (
    <div className="profile-card flex flex-wrap justify-start gap-4 rounded-md p-6 shadow-sm">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-invert">{value}</p>
        <p className="body-medium text-invert-secondary">{title}</p>
      </div>
    </div>
  );
};

export default StatesCard;
