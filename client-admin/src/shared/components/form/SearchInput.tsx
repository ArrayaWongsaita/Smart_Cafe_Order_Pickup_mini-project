'use client';

import { Input } from '@/shared/components/ui/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  queryKey?: string;
  placeholder?: string;
  debounceDelay?: number;
  className?: string;
}

export default function SearchInput({
  queryKey = 'search',
  placeholder = 'ค้นหา...',
  debounceDelay = 500,
  className = '',
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ดึงค่าเริ่มต้นจาก URL query
  const initialValue = searchParams.get(queryKey) || '';
  const [searchValue, setSearchValue] = useState(initialValue);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(searchValue);
    }, debounceDelay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, debounceDelay]);

  // อัปเดต URL โดยไม่เปลี่ยน pathname
  const updateURL = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set(queryKey, value.trim());
      } else {
        params.delete(queryKey);
      }

      // รีเซ็ตหน้าเป็น 1 เมื่อมีการค้นหาใหม่
      if (params.has('page') && value.trim() !== initialValue) {
        params.delete('page');
      }

      const newURL = `${pathname}?${params.toString()}`;
      router.replace(newURL);
    },
    [searchParams, pathname, router, queryKey, initialValue]
  );

  // ฟังก์ชันล้างการค้นหา
  const clearSearch = () => {
    setSearchValue('');
  };

  // อัปเดต state เมื่อ URL เปลี่ยน (เช่น กดปุ่ม back/forward)
  useEffect(() => {
    const currentValue = searchParams.get(queryKey) || '';
    if (currentValue !== searchValue) {
      setSearchValue(currentValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, queryKey]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="ล้างการค้นหา"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
