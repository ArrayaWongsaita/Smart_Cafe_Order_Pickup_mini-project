import Home from '@/app/page';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Page Component', () => {
  it('renders the Next.js logo', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/next.svg');
  });

  it('renders the paragraph', () => {
    render(<Home />);
    const paragraphElement = screen.getAllByText(/Get started by editing/)[0];

    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveTextContent('Get started by editing');
  });
});
