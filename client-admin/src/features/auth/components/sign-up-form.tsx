'use client';

import { Button } from '@/shared/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from '@/shared/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/shared/schema/auth/auth.schema';
import { signUpCredentials } from '@/features/auth/lib/action/auth.action';
import { FormTextField } from '@/shared/components/form/form-text-field';

type FormInput = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<FormInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: 'john.doe@example.com',
      password: 'Test123',
      confirmPassword: 'Test123',
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    startTransition(async () => {
      const result = await signUpCredentials(data);
      if (result.success) {
        toast.success(result.message || 'User created successfully');
        router.push('/signin');
      } else {
        if (Number(result?.error?.statusCode) === 409) {
          form.setError('email', {
            type: 'manual',
            message: 'Email already exists',
          });
          toast.error('Failed to create user Email already exists');
          return;
        }
        toast.error(result.message || 'Failed to create user');
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormTextField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <FormTextField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <FormTextField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="spin-in" />
              loading
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  );
}
