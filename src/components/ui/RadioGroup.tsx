// src/components/ui/RadioGroup.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  description?: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Reusable RadioGroup component for mutually exclusive options
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  description,
  name,
  options,
  value,
  onChange,
  error,
  disabled,
  className,
  orientation = 'vertical',
}) => {
  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || description) && (
        <div className="mb-2">
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}
      <div
        className={cn(
          'space-y-2',
          orientation === 'horizontal' && 'flex flex-wrap gap-4'
        )}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              'flex items-start',
              option.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="flex items-center h-5">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => handleChange(option.value)}
                disabled={disabled || option.disabled}
                className={cn(
                  'w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-300 cursor-pointer',
                  (disabled || option.disabled) && 'cursor-not-allowed'
                )}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  'font-medium text-gray-700 cursor-pointer',
                  (disabled || option.disabled) && 'cursor-not-allowed'
                )}
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-gray-500">{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default RadioGroup;
