import { Button } from '@/shared/components/ui/button';

export default function AddToCartButton({ active }: { active: boolean }) {
  const handleAddToCart = () => {
    // Handle add to cart logic
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!active}
      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
        active
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      {active ? 'เพิ่มลงตะกร้า' : 'ไม่พร้อมจำหน่าย'}
    </Button>
  );
}
