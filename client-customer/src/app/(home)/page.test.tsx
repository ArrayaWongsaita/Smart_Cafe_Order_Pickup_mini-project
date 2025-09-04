import Home from '@/app/(home)/page';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

// Mock TransitionLink component
vi.mock('@/features/transitionNavigate/components/TransitionLink', () => ({
  default: ({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Coffee: ({ className }: { className?: string }) => (
    <div className={className} data-testid="coffee-icon" />
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <div className={className} data-testid="arrow-right-icon" />
  ),
}));

describe('Home Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders welcome message in Thai', () => {
    render(<Home />);

    // Check main heading
    expect(screen.getAllByText('ยินดีต้อนรับ')[0]).toBeInTheDocument();
    expect(screen.getAllByText('สู่ Coffee House')[0]).toBeInTheDocument();
  });

  it('renders coffee shop description', () => {
    render(<Home />);

    // Check description text using more specific queries
    expect(
      screen.getAllByText(
        /ร้านกาแฟที่พร้อมเสิร์ฟความอร่อยและความสุขให้กับคุณ/
      )[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/เลือกเมนูที่ชื่นชอบและสั่งได้ทันที/)[0]
    ).toBeInTheDocument();
  });

  it('renders opening hours information', () => {
    render(<Home />);

    expect(
      screen.getAllByText('เปิดบริการทุกวัน 07:00 - 21:00 น.')[0]
    ).toBeInTheDocument();
  });

  it('renders coffee icon', () => {
    render(<Home />);

    const coffeeIcons = screen.getAllByTestId('coffee-icon');
    expect(coffeeIcons[0]).toBeInTheDocument();
    expect(coffeeIcons[0]).toHaveClass('w-12', 'h-12', 'text-green-600');
  });

  it('renders menu button with correct text and icon', () => {
    render(<Home />);

    // Check menu button text
    const menuButtons = screen.getAllByText('เข้าสู่เมนู');
    expect(menuButtons[0]).toBeInTheDocument();

    // Check arrow icon in menu button
    const arrowIcons = screen.getAllByTestId('arrow-right-icon');
    expect(arrowIcons[0]).toBeInTheDocument();
  });

  it('renders menu button with correct link', () => {
    render(<Home />);

    // Find the link element that contains the menu button
    const menuLinks = screen.getAllByRole('link');
    expect(menuLinks[0]).toHaveAttribute('href', '/menu/1');
  });

  it('has correct styling classes for main container', () => {
    const { container } = render(<Home />);

    // Check if main container has correct background using container
    const mainDiv = container.querySelector('.min-h-screen.bg-secondary');
    expect(mainDiv).toBeInTheDocument();
  });

  it('renders all text content correctly', () => {
    render(<Home />);

    // Test Thai text content using getAllBy functions
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    const h2Elements = screen.getAllByRole('heading', { level: 2 });
    const linkElements = screen.getAllByRole('link');

    expect(h1Elements[0]).toHaveTextContent('ยินดีต้อนรับ');
    expect(h2Elements[0]).toHaveTextContent('สู่ Coffee House');
    expect(linkElements[0]).toHaveTextContent('เข้าสู่เมนู');
  });

  it('renders the main structure correctly', () => {
    const { container } = render(<Home />);

    // Test overall structure
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('.text-center')).toBeInTheDocument();
    expect(
      container.querySelector('.w-24.h-24.bg-white.rounded-full')
    ).toBeInTheDocument();
  });
});
