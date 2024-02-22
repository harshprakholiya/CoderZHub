import Question from '@/components/forms/Question';
import React from 'react';

const AskQuestion = () => {
  return (
    <div>
      <h1 className="h1-bold text-invert flex-center w-full">Ask a Question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default AskQuestion;
