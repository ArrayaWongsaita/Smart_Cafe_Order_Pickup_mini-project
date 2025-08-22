import {
  DURATION_END,
  DURATION_START,
} from '@/features/transitionNavigate/constants/duration';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { NextRouter, useRouter } from 'next/router';
import { create } from 'zustand';

interface NavigationStore {
  isAnimating: boolean;
  startAnimation: () => void;
  stopAnimation: () => void;
  TransitionNavigate: (
    href: string,
    router: AppRouterInstance,
    pathname: string
  ) => Promise<void>;
}
export const useNavigation = create<NavigationStore>((set) => ({
  isAnimating: false,
  startAnimation: () => set({ isAnimating: true }),
  stopAnimation: () => set({ isAnimating: false }),
  TransitionNavigate: async (
    href: string,
    router: AppRouterInstance,
    pathname: string
  ) => {
    if (pathname === href) return;
    set({ isAnimating: true });
    await new Promise((resolve) => setTimeout(resolve, DURATION_START + 100));
    router.push(href);
    await new Promise((resolve) => setTimeout(resolve, DURATION_END));
    set({ isAnimating: false });
  },
}));
