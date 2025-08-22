'use client';

import { Input } from '@/shared/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormTextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  labelClassName?: string;
  messageClassName?: string;
}

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  labelClassName = 'text-xs',
  messageClassName = 'text-xs',
}: FormTextFieldProps<TFieldValues>) {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const actualType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <FormControl>
            <div className={isPassword ? 'relative' : undefined}>
              <Input placeholder={placeholder} type={actualType} {...field} />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className={messageClassName} />
        </FormItem>
      )}
    />
  );
}
