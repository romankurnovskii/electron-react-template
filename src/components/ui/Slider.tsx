// src/components/ui/Slider.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  minLabel?: string;
  maxLabel?: string;
  showValue?: boolean;
  valueDisplay?: (value: number) => string;
}

/**
 * Reusable Slider component for range values (volume, brightness, etc.)
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, description, minLabel, maxLabel, showValue = true, valueDisplay, id, value, ...props }, ref) => {
    const sliderId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const displayValue = valueDisplay ? valueDisplay(value as number) : value;

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <label htmlFor={sliderId} className="text-sm font-medium text-gray-700">
                {label}
              </label>
            )}
            {showValue && value !== undefined && (
              <span className="text-sm text-gray-600 font-medium">{displayValue}</span>
            )}
          </div>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="range"
            id={sliderId}
            value={value}
            className={cn(
              'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300',
              props.disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            {...props}
          />
          {/* Custom slider track styling */}
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              background: #2563eb;
              border-radius: 50%;
              cursor: pointer;
              transition: background 0.15s ease-in-out;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              background: #1d4ed8;
            }
            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background: #2563eb;
              border: none;
              border-radius: 50%;
              cursor: pointer;
            }
          `}</style>
        </div>
        {(minLabel || maxLabel) && (
          <div className="flex justify-between mt-1">
            {minLabel && <span className="text-xs text-gray-500">{minLabel}</span>}
            {maxLabel && <span className="text-xs text-gray-500">{maxLabel}</span>}
          </div>
        )}
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
