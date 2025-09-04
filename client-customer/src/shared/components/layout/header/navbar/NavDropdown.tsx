'use client';

import { cn } from '@/shared/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import TransitionLink from '@/features/transitionNavigate/components/TransitionLink';

interface DropdownItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  activeHref: string;
  activePattern: RegExp | string;
}

export default function NavDropdown({
  label,
  items,
  activeHref,
  activePattern,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive =
    typeof activePattern === 'string'
      ? activeHref.startsWith(activePattern)
      : activePattern.test(activeHref);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (typeof window === 'undefined') return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      if (typeof window === 'undefined') return;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // เพิ่ม logging เพื่อ debug
  const toggleDropdown = () => {
    console.log('Toggle dropdown clicked, current state:', isOpen);
    setIsOpen((prevState) => !prevState);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={cn(
          'text-white font-light cursor-pointer flex items-center gap-1 hover:text-gray-200 transition-colors px-3 py-2 relative',
          isActive && 'font-normal' // Make active text slightly bolder
        )}
        onClick={toggleDropdown}
      >
        {label}
        <ChevronDown
          size={16}
          className={`ml-1 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        {isActive && (
          <div
            className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-white"
            style={{ boxShadow: '0px -1px 3px rgba(255,255,255,0.3)' }}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 shadow-lg rounded-md py-1 w-48 z-10 border border-gray-100">
          {items.map((item, index) => (
            <TransitionLink href={item.href} key={index}>
              <div
                className={cn(
                  'px-4 py-2 hover:bg-gray-50 font-light flex items-center gap-2 transition-colors',
                  activeHref === item.href ? 'bg-gray-50 text-blue-600' : ''
                )}
                onClick={handleItemClick}
              >
                {item.icon && <item.icon size={16} className="text-gray-500" />}
                <div className="pl-2">{item.label}</div>
              </div>
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  );
}
