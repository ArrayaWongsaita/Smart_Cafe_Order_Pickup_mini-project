import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { PropsWithChildren } from 'react';

type AuthCardProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full shadow-none border-none sm:w-xl">
      <CardHeader>
        <CardTitle className="text-[30px] text-[#343434] leading-[38px] mx-auto font-semibold p-4  ">
          {title}
        </CardTitle>
        <CardDescription className="text-[16px] text-[#343434] leading-[24px] mx-auto   ">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
