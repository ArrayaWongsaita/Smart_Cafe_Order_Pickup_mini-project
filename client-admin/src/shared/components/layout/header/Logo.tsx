import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { PUBLIC_ROUTE } from '@/shared/constants/route';
import LogoImage from '@/shared/components/icons/Logo';

export default function Logo() {
  return (
    <div className="hover:cursor-pointer hover:scale-105  -my-10 overflow-hidden">
      <TransitionLink
        href={PUBLIC_ROUTE.HOME}
        className="flex items-center scale-50"
      >
        <LogoImage />
      </TransitionLink>
    </div>
  );
}
