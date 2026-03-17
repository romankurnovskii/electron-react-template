// src/components/ui/Toggle.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

/**
 * Reusable Toggle/Switch component
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-center justify-between">
        {(label || description) && (
          <div className="mr-4">
            {label && (
              <label htmlFor={toggleId} className="text-sm font-medium text-gray-700 cursor-pointer">
                {label}
              </label>
            )}
            {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600',
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          />
        </div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
