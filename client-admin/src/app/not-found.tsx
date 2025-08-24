import Link from 'next/link';

import { Coffee, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center bg-gradient-to-br from-background to-muted/30">
      <div className="relative">
        <div className="absolute -top-2 -right-2 text-primary/20 text-8xl">
          ☕
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <Coffee className="h-16 w-16 text-primary" />
            <div className="absolute -top-1 -right-1 text-xs">💨</div>
          </div>
          <div>
            <h1 className="text-6xl font-bold text-foreground tracking-tight">
              404
            </h1>
            <p className="text-muted-foreground font-medium">Page Not Found</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">
          หน้าที่คุณหานั้นไม่อยู่
        </h2>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          เหมือนเมนูที่หมดแล้ว... แต่เรายังมีกาแฟดีๆ รออยู่ที่หน้าแรก ☕
        </p>
        <p className="text-sm text-muted-foreground/80 italic">
          This page seems to be off our menu today!
        </p>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Button asChild>
          <TransitionLink href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            กลับหน้าแรก
          </TransitionLink>
        </Button>
      </div>

      <div className="text-xs text-muted-foreground/60 mt-8">
        🍪 Maybe grab a cookie while you're here?
      </div>
    </main>
  );
}
