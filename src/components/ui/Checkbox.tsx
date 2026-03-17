// src/components/ui/Checkbox.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

/**
 * Reusable Checkbox component
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, indeterminate, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    const handleRef = (element: HTMLInputElement | null) => {
      (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={handleRef}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-300 focus:ring-offset-0 cursor-pointer',
              props.disabled && 'bg-gray-100 cursor-not-allowed opacity-50',
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label htmlFor={checkboxId} className={cn('font-medium text-gray-700', props.disabled && 'cursor-not-allowed')}>
                {label}
              </label>
            )}
            {description && <p className="text-gray-500">{description}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
