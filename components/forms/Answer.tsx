'use client';

import { AnswersSchema } from '@/lib/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useTheme } from '@/context/themeProvider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { createAnswer } from '@/lib/actions/answer.action';
import { usePathname } from 'next/navigation';
import Loading from '../shared/Loading';

interface AnswerProps {
  question: string;
  questionId: string;
  authorId: string;
}

const Answers = ({ question, questionId, authorId }: AnswerProps) => {
  const pathName = usePathname();
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const form = useForm<z.infer<typeof AnswersSchema>>({
    resolver: zodResolver(AnswersSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswersSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathName,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent('');
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  const enhanceAnswer = async () => {
    if (!authorId) return;
    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: 'POST',
          body: JSON.stringify({ editorContent }),
        }
      );

      const aiAnswer = await response.json();

      const aiReplay = aiAnswer.reply;
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(aiReplay);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div>
      {isSubmitting && <Loading title="Submitting your answer" />}
      {isSubmittingAI && <Loading title="AI is enhancing your answer 😀" />}
      <div className="mt-8 flex w-full flex-row items-center justify-between gap-5 max-sm:mt-3 sm:gap-2">
        <h4 className="h3-semibold max-sm:paragraph-semibold  text-invert max-sm:text-center">
          Write your answer
        </h4>

        {/*  TODO: Add hover effect to the button */}
        <Button
          className="btn text-invert-secondary gap-1.5 rounded-md px-4 py-2.5"
          onClick={enhanceAnswer}
          disabled={isSubmittingAI}
        >
          {isSubmittingAI ? (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star icon"
                width={12}
                height={12}
                className="object-contain"
              />
              <p className="max-sm:hidden">Enhancing...</p>
            </>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star icon"
                width={12}
                height={12}
                className="object-contain"
              />
              <p className="max-sm:hidden">Enhance your answer</p>
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    key={mode}
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    // onEditorChange={(content, field) => handleEditorChange}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => {
                      field.onChange(content);
                      handleEditorChange(content);
                    }} // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    init={{
                      skin: mode === 'light' ? 'oxide' : 'oxide-dark',
                      content_css: mode === 'light' ? 'default' : 'dark',
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'link',
                        'quickbars', // Add the quickbars plugin here
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter | ' +
                        'alignright alignjustify | bullist numlist link | quickbars', // Add quickbars to the toolbar
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
                    }}
                  />
                </FormControl>
                <FormMessage className="text-error-700" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient paragraph-regular w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answers;
