import { Metadata } from 'next';
import AuthCard from '@/features/auth/components/auth-card';
import SignUpForm from '@/features/auth/components/sign-up-form';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Sign Up',
};
// <AuthCard title="Create new account" description="Get Started - It's free."></AuthCard>
export default function SignUpPage() {
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
      <div className="w-full  md:h-[600px]   md:px-0 md:w-[50%] ">
        <div className="flex items-center justify-center h-full rounded-[36px] md:p-10  ">
          <AuthCard
            title="Create new account"
            description="Get Started - It's free."
          >
            <SignUpForm />
            <div className="text-center text-sm mt-4">
              <span>
                Do you have an account?{' '}
                <TransitionLink href="/signin" className="hover:underline">
                  Sign in
                </TransitionLink>
              </span>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}
