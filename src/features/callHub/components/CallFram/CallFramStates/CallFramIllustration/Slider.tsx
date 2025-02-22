import { DeviceUtility } from '@/utils/device_utility';
import Image from 'next/image'
import React, { useMemo } from 'react'

type SliderProps = {
  images: string[];
  duration?: number;
  gap?: number;
  direction?: 'up' | 'down';
}

function Slider({ 
  images, 
  duration = 20, 
  gap = 16, 
  direction = 'up'
}: SliderProps) {
  const imageSize = useMemo(() => {
    return DeviceUtility.isMobile() ? "200px" : "300px"
  }, []);
  const imageWidthClass = useMemo(() => {
    return DeviceUtility.isMobile() ? "w-[200px]" : "w-[300px]"
  }, []);
  const imageHeightClass = useMemo(() => {
    return DeviceUtility.isMobile() ? "h-[200px]" : "h-[300px]"
  }, []);
  return (
    <div className={`relative overflow-hidden h-full ${imageWidthClass}`}>
      <style>
        {`
          @keyframes slideUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(calc(-${images.length} * (${imageSize} + ${gap}px)));
            }
          }
          @keyframes slideDown {
            0% {
              transform: translateY(calc(-${images.length} * (${imageSize} + ${gap}px)));
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div 
        className="flex flex-col absolute"
        style={{ 
          gap: `${gap}px`,
          animation: `${direction === 'up' ? 'slideUp' : 'slideDown'} ${duration}s linear infinite`,
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="flex-shrink-0"
          >
            <Image
              className={`rounded-xl ${imageWidthClass} ${imageHeightClass} object-cover`}
              src={image}
              width={300}
              height={300}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <div
            key={`${image}-${index}-duplicate`}
            className="flex-shrink-0"
          >
            <Image
              className={`rounded-xl ${imageWidthClass} ${imageHeightClass} object-cover`}
              src={image}
              width={300}
              height={300}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider