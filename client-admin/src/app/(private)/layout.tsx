import { authenticateUser } from '@/shared/lib';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authenticateUser();
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-foreground">
      {children}
    </div>
  );
}
