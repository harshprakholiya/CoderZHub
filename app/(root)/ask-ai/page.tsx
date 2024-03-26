'use client';

import ParseHtml from '@/components/shared/ParseHtml';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Page = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('')

  const handelInputChange = (value: string) => {
    setQuestion(value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

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
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Ask AI</h1>
      <div>
        {question === '' ? (
          'Ask me anything...'
        ) : (
          <div>
            <p>This is Question...</p>
            <ParseHtml content={content} />
          </div>
        )}
      </div>
      <div>
        <Input
          placeholder="Ask me anything..."
          type="text"
          onChange={(e) => handelInputChange(e.target.value)}
        />
        <Button disabled={isSubmitting} onClick={handleSubmit}>
          Ask AI
        </Button>
      </div>
    </div>
  );
};

export default Page;
