import Image from 'next/image';
import React from 'react'

type SliderProps = {
  images?: string[];
  duration?: number;
  gap?: number;
  direction?: 'up' | 'down';
  calssName?: string
}

const imageSize = 300;

function Slider({
  images = [],
  duration = 20,
  gap = 20,
  direction = 'up',
  calssName,
}: SliderProps) {

  // If no images, don't render
  if (!images.length) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden h-full w-full ${calssName}`}>
      <style>
        {`
          @keyframes slideUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(calc(-${images.length} * (${imageSize}px + ${gap}px)));
            }
          }
          @keyframes slideDown {
            0% {
              transform: translateY(calc(-${images.length} * (${imageSize}px + ${gap}px)));
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div
        className="flex flex-col absolute w-full gap-5"
        style={{
          animation: `${direction === 'up' ? 'slideUp' : 'slideDown'} ${duration}s linear infinite`,
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="w-full"
          >
            <Image
              // style={{ height: `${imageSize}px`, width: `${imageSize}px` }}
              priority
              className={`rounded-xl object-cover`}
              src={{ src: image, width: 300, height: 400 }}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <div
            key={`${image}-${index}-duplicate`}
            className="w-full"
          >
            <Image
              // style={{ height: `${imageSize}px`, width: `${imageSize}px`  }}
              priority
              className={`rounded-xl object-cover`}
              src={{ src: image, width: 300, height: 400 }}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider