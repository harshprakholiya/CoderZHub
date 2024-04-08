'use client';

import NoResult from '@/components/shared/NoResult';
import ParseHtml from '@/components/shared/ParseHtml';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';


const Page = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handelInputChange = (value: string) => {
    setQuestion(value);
  };

  const handleSubmit = async () => {
    if (content === '') {
      setIsSubmitting(true);
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ask-ai`,
          {
            method: 'POST',
            body: JSON.stringify({ question }),
          }
        );

        const aiAnswer = await response.json();

        const aiReplay = aiAnswer.reply;

        setContent(aiReplay);
        
        setQuestion('');
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    } else {
      setContent('');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-10 flex items-center justify-between gap-5 max-sm:w-full">
        <Input
          placeholder="Ask me anything..."
          type="text"
          value={question}
          onChange={(e) => handelInputChange(e.target.value)}
          className="paragraph-regular no-focus search_background min-h-[50px] border-none px-5 text-gray-600 shadow-none outline-none dark:text-gray-400"
        />
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="btn primary-gradient body-medium rounded-md p-5 text-grey-50"
        >
          {content === '' ? 'Ask AI' : 'clear'}
        </Button>
      </div>
      <div className=" overflow-y-auto">
        <div className="">
          {content === '' && !isLoading ? (
            <NoResult
              title="How can i help you?"
              description="Ask me anything related to programming and i will try to answer you.😊"
            />
          ) : isLoading ? (
            <div className="flex-center flex-col px-5">
              <ReloadIcon className="mt-3 h-7 w-7 animate-spin text-primary-400" />
              <p className="paragraph-regular text-invert-secondary mt-5">
                Generating Answer...
              </p>
            </div>
          ) : (
            <ParseHtml content={content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
