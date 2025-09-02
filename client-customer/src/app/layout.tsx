import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/shared/styles/globals.css';
import { Toaster } from 'sonner';
import SlideTransition from '@/features/transitionNavigate/components/SlideTransition';
import Header from '@/shared/components/layout/header/Header';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/shared/lib/auth';
import { PUBLIC_ROUTE } from '@/shared/constants';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import HeaderWrapper from '@/shared/components/layout/header/HeaderWrapper';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Coffee House',
  description: 'Coffee House - Your favorite coffee shop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <SlideTransition>
              <Header />
              {children}
            </SlideTransition>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
