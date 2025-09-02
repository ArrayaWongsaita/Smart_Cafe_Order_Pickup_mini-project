import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Coffee } from 'lucide-react';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { PUBLIC_ROUTE } from '@/shared/constants';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Welcome Section */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center px-6 max-w-2xl">
          {/* Welcome Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
              <Coffee className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              ยินดีต้อนรับ
            </h1>
            <h2 className="text-2xl md:text-3xl text-secondary-foreground font-semibold mb-6">
              สู่ Coffee House
            </h2>
            <p className="text-lg text-secondary-foreground leading-relaxed">
              ร้านกาแฟที่พร้อมเสิร์ฟความอร่อยและความสุขให้กับคุณ
              <br />
              เลือกเมนูที่ชื่นชอบและสั่งได้ทันที
            </p>
          </div>

          {/* Menu Button */}
          <div className="mb-8">
            <TransitionLink
              href={PUBLIC_ROUTE.MENU(1)}
              className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>เข้าสู่เมนู</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </TransitionLink>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-secondary-foreground">
            <p>เปิดบริการทุกวัน 07:00 - 21:00 น.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
