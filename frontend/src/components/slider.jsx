// import React from "react";

// const Slider = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
//   return (
//     <div className="w-full flex flex-col items-center">
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => onChange(parseInt(e.target.value))}
//         className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//       />
//     </div>
//   );
// };

// export default Slider;

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CustomSlider = ({ 
  min = 0, 
  max = 100, 
  step = 1, 
  value = [0, 100], 
  onValueChange,
  className = ''
}) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(null);
  const [internalValue, setInternalValue] = useState(value);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackLeft, setTrackLeft] = useState(0);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (trackRef.current) {
      const updateTrackDimensions = () => {
        const rect = trackRef.current.getBoundingClientRect();
        setTrackWidth(rect.width);
        setTrackLeft(rect.left);
      };

      updateTrackDimensions();
      window.addEventListener('resize', updateTrackDimensions);
      return () => window.removeEventListener('resize', updateTrackDimensions);
    }
  }, [trackRef]);

  const calculateNewValue = (clientX) => {
    const position = clientX - trackLeft;
    const percentage = Math.max(0, Math.min(1, position / trackWidth));
    const newValue = Math.round(min + percentage * (max - min) / step) * step;
    return newValue;
  };

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleTouchStart = (e, index) => {
    setIsDragging(index);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging !== null) {
        const newValue = calculateNewValue(e.clientX);
        updateValue(isDragging, newValue);
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging !== null && e.touches[0]) {
        const newValue = calculateNewValue(e.touches[0].clientX);
        updateValue(isDragging, newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    const handleTouchEnd = () => {
      setIsDragging(null);
    };

    if (isDragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, trackWidth, trackLeft, min, max, step]);

  const updateValue = (index, newValue) => {
    const newValues = [...internalValue];

    // Ensure values don't cross each other
    if (index === 0) {
      // Left thumb
      newValues[index] = Math.min(newValues[1], newValue);
    } else {
      // Right thumb
      newValues[index] = Math.max(newValues[0], newValue);
    }

    setInternalValue(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  const getPosition = (value) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className={`relative w-full h-8 ${className}`}>
      {/* Track */}
      <div 
        ref={trackRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200 rounded-full"
      />
      
      {/* Range */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-[#FFC0CB] to-[#FF9999] rounded-full" 
        style={{ 
          left: `${getPosition(internalValue[0])}%`, 
          width: `${getPosition(internalValue[1]) - getPosition(internalValue[0])}%` 
        }}
      />

      {/* Thumbs */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-[#FF9999] shadow-md cursor-grab active:cursor-grabbing z-10" 
        style={{ 
          left: `${getPosition(internalValue[0])}%`,
        }}
        onMouseDown={(e) => handleMouseDown(e, 0)}
        onTouchStart={(e) => handleTouchStart(e, 0)}
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white bg-[#FF9999] shadow-md cursor-grab active:cursor-grabbing z-10" 
        style={{ 
          left: `${getPosition(internalValue[1])}%`,
        }}
        onMouseDown={(e) => handleMouseDown(e, 1)}
        onTouchStart={(e) => handleTouchStart(e, 1)}
      />
    </div>
  );
};

CustomSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number),
  onValueChange: PropTypes.func,
  className: PropTypes.string
};

export default CustomSlider;
