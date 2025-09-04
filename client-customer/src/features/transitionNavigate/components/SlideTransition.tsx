'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, text } from 'animejs';
import Image from 'next/image';
import { useNavigation } from '@/features/transitionNavigate/hooks/navigation';
import {
  DURATION,
  DURATION_END,
  DURATION_START,
} from '@/features/transitionNavigate/constants/duration';
const CoffeeFile = '/images/coffee.png';

export default function SlideTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAnimating } = useNavigation();

  const overlayRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const coffeeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const { chars } = text.split('p', {
      chars: true,
    });

    animate(chars, {
      y: ['0px', '-35px', '35px', '0px'],
      x: ['0px', '25px', '25px', '0px'],
      delay: stagger(150),
      loop: true,
    });
  }, []);

  useEffect(() => {
    if (coffeeRef.current) {
      coffeeRef.current.style.transformOrigin = '50% 100%'; // center bottom
      animate(coffeeRef.current, {
        rotate: [0, 20, 0, -20],
        duration: (DURATION_START + DURATION_END) * 2,
      });
    }
    if (!overlayRef.current || !slideRef.current) return;
    if (!isAnimating) {
      animate(overlayRef.current, {
        opacity: [1, 0],
        duration: DURATION_START,
        ease: 'inOut',
      });
    } else {
      if (!slideRef.current) return;
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: DURATION_END,
        ease: 'inOut',
      });

      slideRef.current.style.opacity = String(1);

      const textWidth = 350;
      animate(slideRef.current, {
        translateX: [`-${textWidth}px`, `100vw`],
        duration: DURATION * 2,
        ease: 'inOut',
        onComplete: () => {
          // ซ่อน text หลัง animation เสร็จ
          if (!slideRef.current) return;
          slideRef.current.style.opacity = String(0);
        },
      });
    }
  }, [isAnimating]);

  return (
    <div className="relative ">
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] pointer-events-none bg-sidebar-primary-foreground opacity-0"
      ></div>
      <div
        ref={slideRef}
        className="fixed top-1/2 left-0 -translate-y-1/2 z-[9999] pointer-events-none opacity-0"
      >
        <div className="flex  items-center justify-center gap-6 p-4 rounded-xl">
          <p className="text-4xl md:text-6xl font-bold ">Coffee House</p>

          <Image
            ref={coffeeRef}
            src={CoffeeFile}
            alt="logo"
            className="image scale-90 md:scale-100"
            width={120}
            height={120}
            // Ensure both dimensions can adjust proportionally when scaled to silence Next.js warning
            style={{ height: 'auto', width: 'auto' }}
          />
        </div>
      </div>

      {children}
    </div>
  );
}
