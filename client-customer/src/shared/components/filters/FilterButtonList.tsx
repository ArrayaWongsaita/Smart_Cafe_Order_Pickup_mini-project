'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { OptionsSelectType } from '@/shared/types/common/options.type';

interface FilterButtonListProps {
  options: OptionsSelectType;
  queryKey: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  showAllButton?: boolean;
  allButtonLabel?: string;
}

export default function FilterButtonList({
  options,
  queryKey,
  placeholder = 'เลือกตัวกรอง',
  className = '',
  buttonClassName = '',
  activeButtonClassName = '',
  showAllButton = true,
  allButtonLabel = 'ทั้งหมด',
}: FilterButtonListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ดึงค่าปัจจุบันจาก URL query
  const currentValue = searchParams.get(queryKey);

  // อัปเดต URL query
  const updateQuery = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== '') {
        params.set(queryKey, value);
      } else {
        params.delete(queryKey);
      }

      // รีเซ็ตหน้าเป็น 1 เมื่อมีการกรองใหม่
      if (params.has('page')) {
        params.delete('page');
      }

      const newURL = `${pathname}?${params.toString()}`;
      router.replace(newURL);
    },
    [searchParams, pathname, router, queryKey]
  );

  // สไตล์ปุ่ม default
  const defaultButtonClass = `
    px-4 py-2 rounded-lg border transition-all duration-200 font-medium text-sm
    hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50
    ${buttonClassName}
  `;

  const defaultActiveClass = `
    bg-primary text-primary-foreground border-primary shadow-md
    ${activeButtonClassName}
  `;

  const defaultInactiveClass = `
    bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {placeholder && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {placeholder}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {/* ปุ่ม "ทั้งหมด" */}
        {showAllButton && (
          <button
            onClick={() => updateQuery(null)}
            className={`
              ${defaultButtonClass}
              ${!currentValue ? defaultActiveClass : defaultInactiveClass}
            `}
          >
            {allButtonLabel}
          </button>
        )}

        {/* ปุ่มตัวเลือกต่างๆ */}
        {options.map((option) => {
          const isActive = currentValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => updateQuery(option.value)}
              className={`
                ${defaultButtonClass}
                ${isActive ? defaultActiveClass : defaultInactiveClass}
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* แสดงตัวกรองปัจจุบัน */}
      {currentValue && (
        <div className="text-xs text-gray-500">
          กรองโดย:{' '}
          {options.find((opt) => opt.value === currentValue)?.label ||
            currentValue}
        </div>
      )}
    </div>
  );
}
