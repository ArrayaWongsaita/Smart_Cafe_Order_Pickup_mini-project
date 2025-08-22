import Image from 'next/image';
const logoUrl = '/images/coffee.png';
export default function LogoImage() {
  return (
    <div className="w-full h-full flex items-center space-x-3">
      <Image
        src={logoUrl}
        alt=" logo"
        width={60}
        height={60}
        style={{ height: 'auto' }}
      />
    </div>
  );
}
