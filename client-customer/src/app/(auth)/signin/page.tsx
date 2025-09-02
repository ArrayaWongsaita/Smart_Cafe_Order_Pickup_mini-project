import AuthCard from '@/features/auth/components/auth-card';
import SignInForm from '@/features/auth/components/sign-in-form';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';

import { Metadata } from 'next';

import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your account to access your personal finance management dashboard.',
};
export default async function SignInPage() {
  return (
    <div className="p-6 w-full h-full max-w-7xl md:mx-auto flex flex-col md:flex-row items-center justify-center ">
      <div className="hidden md:block w-full md:w-[50%]  relative">
        <Image
          src="/images/coffee.png"
          alt="logo"
          className="w-full"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full  md:h-[600px]  px-6 md:px-0 md:w-[50%] ">
        <div className="flex items-center justify-center h-full rounded-[36px] md:p-10 ">
          <AuthCard
            title="เข้าสู่ระบบ"
            description="Welcome back! Please enter your details."
          >
            <SignInForm />

            <div className="text-center text-sm mt-4">
              <span>
                Don&apos;t have an account?{' '}
                <TransitionLink href="/signup" className="hover:underline">
                  Sign Up
                </TransitionLink>
              </span>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
