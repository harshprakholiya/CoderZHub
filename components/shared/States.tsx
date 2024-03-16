import { formatNumber } from '@/lib/utils';
import StatesCard from './StatesCard';

interface StatesParams {
  totalQuestions: number;
  totalAnswers: number;
}

const States = ({ totalQuestions, totalAnswers }: StatesParams) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-invert">States</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="profile-card flex flex-wrap justify-evenly gap-4 rounded-md p-6 shadow-sm">
          <div>
            <p className="paragraph-semibold text-invert">
              {formatNumber(totalQuestions)}{' '}
            </p>
            <p className="body-medium text-invert-secondary">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-invert">
              {formatNumber(totalAnswers)}{' '}
            </p>
            <p className="body-medium text-invert-secondary">Answers</p>
          </div>
        </div>

        <StatesCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badges"
        />

        <StatesCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={0}
          title="Silver Badges"
        />

        <StatesCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title="bronze Badges"
        />
      </div>
    </div>
  );
};

export default States;
