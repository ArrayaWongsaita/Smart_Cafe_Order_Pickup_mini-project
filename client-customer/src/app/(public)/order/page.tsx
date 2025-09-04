'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PUBLIC_ROUTE } from '@/shared/constants';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Search, Package } from 'lucide-react';
import { useNavigation } from '@/features/transitionNavigate/hooks/navigation';

export default function OrderPage() {
  const [orderCode, setOrderCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { TransitionNavigate } = useNavigation();
  const router = useRouter();
  const pathName = usePathname();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderCode.trim()) {
      return;
    }

    setIsSearching(true);

    TransitionNavigate(
      PUBLIC_ROUTE.ORDER_STATUS(orderCode.trim()),
      router,
      pathName
    );
    setIsSearching(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center">
              <Package className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            ติดตามคำสั่งซื้อ
          </h1>
          <p className="text-gray-600">
            ใส่รหัสคำสั่งซื้อของคุณเพื่อติดตามสถานะ
          </p>
        </div>

        {/* Search Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">ค้นหาคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderCode">รหัสคำสั่งซื้อ</Label>
                <Input
                  id="orderCode"
                  type="text"
                  placeholder="กรอกรหัสคำสั่งซื้อ เช่น ORD-123456"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  className="text-center font-mono"
                  disabled={isSearching}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!orderCode.trim() || isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    กำลังค้นหา...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    ติดตามคำสั่งซื้อ
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500">
          <p>รหัสคำสั่งซื้อจะส่งให้คุณทาง SMS หรือ Email</p>
          <p>หลังจากที่ทำการสั่งซื้อเสร็จสิ้น</p>
        </div>
      </div>
    </div>
  );
}
