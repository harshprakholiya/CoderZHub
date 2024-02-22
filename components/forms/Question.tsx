'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { QuestionsSchema } from '@/lib/validation';

const Question = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: '',
      explanation: '',
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      {' '}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col ">
                <FormLabel className="paragraph-semibold text-invert">
                  Question Title <span className="text-primary-main">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px] border"
                    placeholder="Ask a Question"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular text-invert-3 mt-2.5 ">
                  Ask your question here.
                </FormDescription>
                <FormMessage className="text-error-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="paragraph-semibold text-invert">
                  Detailed explanation of your problem{' '}
                  <span className="text-primary-main">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px] border"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular text-invert-3 mt-2.5 ">
                  Describe your question here, but remember, the more specific
                  you are, the better the answer you&apos;ll get. Imagine
                  you&apos;re asking a friend for help!
                </FormDescription>
                <FormMessage className="text-error-700" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-invert">
                  Tags <span className="text-primary-main">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px] border"
                    placeholder="Add Tags..."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="body-regular text-invert-3 mt-2.5 ">
                  Add up to 3 tags that describe the problem you&apos;re facing.
                  Press Enter to add each tag.
                </FormDescription>
                <FormMessage className="text-error-700" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient px-3 py-4 text-white"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Question;
