import React, { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  showValue = true,
  formatValue = (val) => val.toString(),
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const calculateFillPercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
          {showValue && (
            <span className="text-sm font-medium text-gray-500">
              {formatValue(value)}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <div 
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
        >
          <div 
            className="h-full bg-primary-500 transition-all duration-150"
            style={{ width: `${calculateFillPercentage()}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <div 
          className={`absolute top-0 h-2 w-2 -mt-1 -ml-1 rounded-full border-2 border-white bg-primary-500 shadow transform translate-x-[var(--thumb-position)] transition-transform ${
            isDragging ? 'scale-150' : 'scale-100'
          }`}
          style={{ 
            '--thumb-position': `${calculateFillPercentage()}%` 
          } as React.CSSProperties}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">{min}</span>
        <span className="text-xs text-gray-500">{max}</span>
      </div>
    </div>
  );
};

export default Slider;