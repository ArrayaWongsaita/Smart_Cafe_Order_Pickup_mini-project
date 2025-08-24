'use client';

import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center bg-gradient-to-br from-background to-muted/30">
      <div className="relative">
        <div className="absolute -top-2 -right-2 text-destructive/20 text-8xl">
          ⚠️
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <AlertTriangle className="h-16 w-16 text-destructive" />
            <div className="absolute -top-1 -right-1 text-xs">💥</div>
          </div>
          <div>
            <h1 className="text-6xl font-bold text-foreground tracking-tight">
              Oops!
            </h1>
            <p className="text-muted-foreground font-medium">
              Something went wrong
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">
          เกิดข้อผิดพลาดบางอย่าง
        </h2>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          เครื่องทำกาแฟของเราขัดข้อง... ลองรีเฟรชหน้าใหม่หรือกลับไปหน้าแรก ☕
        </p>
        <p className="text-sm text-muted-foreground/80 italic">
          Our coffee machine seems to be having issues!
        </p>
        {error.message && (
          <details className="mt-4 p-3 bg-muted rounded-lg text-left max-w-md">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
              Technical Details
            </summary>
            <p className="mt-2 text-xs text-muted-foreground/80 font-mono break-all">
              {error.message}
            </p>
          </details>
        )}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Button onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          ลองใหม่
        </Button>
        <Button variant="outline" asChild>
          <TransitionLink href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            กลับหน้าแรก
          </TransitionLink>
        </Button>
      </div>

      <div className="text-xs text-muted-foreground/60 mt-8">
        ☕ Don't worry, the coffee is still brewing!
      </div>
    </main>
  );
}
