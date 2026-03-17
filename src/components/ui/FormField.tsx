// src/components/ui/FormField.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

export interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

/**
 * Reusable FormField wrapper for consistent form field styling
 * Provides label, description, error handling, and layout options
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  error,
  helperText,
  required,
  children,
  className,
  layout = 'vertical',
}) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div className={cn(isHorizontal ? 'flex items-center justify-between gap-4' : 'space-y-1', className)}>
      {(label || description) && (
        <div className={cn(isHorizontal && 'flex-1')}>
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}
      <div className={cn(isHorizontal ? 'flex-1' : 'w-full')}>
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    </div>
  );
};

export default FormField;
