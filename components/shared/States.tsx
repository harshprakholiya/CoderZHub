import { formatNumber } from '@/lib/utils';
import StatesCard from './StatesCard';
import { BadgeCounts } from '@/types';

interface StatesParams {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputation: number;
}

const States = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputation,
}: StatesParams) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-invert">Reputation - {reputation}</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3">
        <StatesCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />

        <StatesCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />

        <StatesCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="bronze Badges"
        />

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
      </div>
    </div>
  );
};

export default States;
