import AdminHome from '@/app/(home)/page';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/home',
}));

// Mock TransitionLink component
interface MockTransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

vi.mock('@/features/transitionNavigate/components/TransitionLink', () => ({
  default: ({
    href,
    children,
    className,
    ...props
  }: MockTransitionLinkProps) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

describe('AdminHome Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the welcome section with admin icon', () => {
    render(<AdminHome />);
    const adminIcon = screen.getByTestId('admin-shield-icon');
    expect(adminIcon).toBeInTheDocument();
  });

  it('renders the main welcome message', () => {
    render(<AdminHome />);
    const welcomeTitle = screen.getByRole('heading', {
      name: 'ยินดีต้อนรับ Admin',
    });
    const systemTitle = screen.getByRole('heading', {
      name: 'ระบบจัดการ Coffee House',
    });

    expect(welcomeTitle).toBeInTheDocument();
    expect(systemTitle).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<AdminHome />);
    const description = screen.getByText(
      /จัดการร้านกาแฟของคุณอย่างมีประสิทธิภาพ/
    );
    expect(description).toBeInTheDocument();
  });

  it('renders the orders quick access button', () => {
    render(<AdminHome />);
    const ordersButton = screen.getByText('ออเดอร์').closest('a');
    expect(ordersButton).toBeInTheDocument();
    expect(ordersButton).toHaveAttribute(
      'href',
      expect.stringContaining('orders')
    );
  });

  it('renders all quick stats cards', () => {
    render(<AdminHome />);
    const userManagement = screen.getByText('จัดการผู้ใช้');
    const salesReport = screen.getByText('รายงานยอดขาย');
    const stockManagement = screen.getByText('สต็อกสินค้า');

    expect(userManagement).toBeInTheDocument();
    expect(salesReport).toBeInTheDocument();
    expect(stockManagement).toBeInTheDocument();
  });

  it('renders version information', () => {
    render(<AdminHome />);
    const versionInfo = screen.getByText(
      'ระบบจัดการ Coffee House - เวอร์ชัน 2.0'
    );
    const updateInfo = screen.getByText(/อัพเดทล่าสุด: วันนี้/);

    expect(versionInfo).toBeInTheDocument();
    expect(updateInfo).toBeInTheDocument();
  });

  it('has proper styling classes for responsive design', () => {
    render(<AdminHome />);
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('renders all sections with proper content', () => {
    render(<AdminHome />);
    // Check for main sections by their text content
    expect(screen.getByText('ออเดอร์')).toBeInTheDocument();
    expect(screen.getByText('จัดการผู้ใช้')).toBeInTheDocument();
    expect(screen.getByText('รายงานยอดขาย')).toBeInTheDocument();
    expect(screen.getByText('สต็อกสินค้า')).toBeInTheDocument();
  });
});
