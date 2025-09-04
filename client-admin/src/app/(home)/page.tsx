import { Shield, BarChart3, Users, Coffee, ShoppingBag } from 'lucide-react';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';
import { PRIVATE_ROUTE } from '@/shared/constants';

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Admin Welcome Section */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center px-6 max-w-4xl">
          {/* Admin Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-6">
              <Shield
                className="w-12 h-12 text-blue-600"
                data-testid="admin-shield-icon"
              />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
              ยินดีต้อนรับ Admin
            </h1>
            <h2 className="text-2xl md:text-3xl text-secondary-foreground font-semibold mb-6">
              ระบบจัดการ Coffee House
            </h2>
            <p className="text-lg text-secondary-foreground leading-relaxed">
              จัดการร้านกาแฟของคุณอย่างมีประสิทธิภาพ
              <br />
              ตรวจสอบยอดขาย จัดการเมนู และดูแลระบบได้ที่เดียว
            </p>
          </div>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
            {/* Dashboard */}

            {/* Orders */}
            <TransitionLink
              href={PRIVATE_ROUTE.ORDERS(1)}
              className="group bg-orange-600 hover:bg-orange-700 text-white p-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <ShoppingBag className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg mb-2">ออเดอร์</h3>
              <p className="text-sm opacity-90">จัดการคำสั่งซื้อ</p>
            </TransitionLink>
          </div>

          {/* Quick Stats or Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-secondary-foreground">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="font-medium">จัดการผู้ใช้</p>
              <p className="text-xs opacity-75">ดูแลบัญชีลูกค้า</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <BarChart3 className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="font-medium">รายงานยอดขาย</p>
              <p className="text-xs opacity-75">วิเคราะห์ประสิทธิภาพ</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Coffee className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <p className="font-medium">สต็อกสินค้า</p>
              <p className="text-xs opacity-75">จัดการคลังสินค้า</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-secondary-foreground mt-8">
            <p>ระบบจัดการ Coffee House - เวอร์ชัน 2.0</p>
            <p className="text-xs opacity-75 mt-1">อัพเดทล่าสุด: วันนี้</p>
          </div>
        </div>
      </main>
    </div>
  );
}
