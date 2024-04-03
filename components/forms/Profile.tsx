'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { ProfileSchema } from '@/lib/validation';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.action';
import Loading from '../shared/Loading';

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const router = useRouter();
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioWebsite: parsedUser.portfolioWebsite || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      {
        isSubmitting && (
          <Loading title="Updating..."/>
        )

      }
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-invert">
                Username <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px]"
                  placeholder="Your username"
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-error-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-invert">
                Name <span className="primary-text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px]"
                  placeholder="Your name"
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-error-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-invert">Portfolio Website </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px]"
                  placeholder="Your portfolio URL"
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-error-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-invert">Location</FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px]"
                  placeholder="Where are you from?"
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-error-500'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="text-invert">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="no-focus paragraph-regular input_background text-invert-secondary min-h-[56px]"
                  placeholder="Write something special about you."
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-error-500'/>
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
