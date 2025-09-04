'use client';

import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';

import { PUBLIC_ROUTE } from '@/shared/constants';
import { signInSchema } from '@/shared/schema/auth/auth.schema';
import { signInCredentials } from '@/features/auth/lib/action/auth.action';
import { FormTextField } from '@/shared/components/form/form-text-field';

type FormInput = z.infer<typeof signInSchema>;
export default function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'customer@example.com',
      password: 'password1',
    },
  });

  const onSubmit = (data: FormInput) => {
    startTransition(async () => {
      const result = await signInCredentials(data);
      if (result.success) {
        toast.success(result.message || 'Signed in successfully');
        // Force router refresh to update session
        router.push(PUBLIC_ROUTE.MENU(1));
      } else {
        form.setError('email', {
          type: 'manual',
          message: result.error?.email?.[0] || 'Invalid email or password',
        });
        form.setError('password', {
          type: 'manual',
          message: result.error?.email?.[0] || 'Invalid email or password',
        });
        toast.error(result.message || 'Failed to sign in');
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 shadow-none  "
        onSubmit={form.handleSubmit(onSubmit)}
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

        <Button variant="default" disabled={isPending}>
          {isPending ? (
            <>
              <Loader className="animate-spin" />
              เข้าสู่ระบบ...
            </>
          ) : (
            'เข้าสู่ระบบ'
          )}
        </Button>
      </form>
    </Form>
  );
}
