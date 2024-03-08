'use client';

import { AnswersSchema } from '@/lib/validation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useTheme } from '@/context/themeProvider';

const Answers = () => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  
  const form = useForm<z.infer<typeof AnswersSchema>>({
    resolver: zodResolver(AnswersSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleCreateAnswer = (data) => {};

  return (
    <div>
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
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    // @ts-ignore
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
                      ],
                      toolbar:
                        'undo redo | ' +
                        'codesample | bold italic forecolor | alignleft aligncenter | ' +
                        'alignright alignjustify | bullist numlist link',
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
                    }}
                  />
                </FormControl>
                <FormMessage className="text-error-700" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Answers;
