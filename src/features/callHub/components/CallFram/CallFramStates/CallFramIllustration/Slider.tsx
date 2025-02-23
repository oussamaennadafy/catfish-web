import Image from 'next/image'
import React from 'react'

type SliderProps = {
  images: string[];
  duration?: number;
  gap?: number;
  direction?: 'up' | 'down';
  containerClassName?: string,
}

function Slider({
  images,
  duration = 20,
  gap = 16,
  direction = 'up',
  containerClassName,
}: SliderProps) {
  return (
    <div className={`relative overflow-hidden h-full w-full ${containerClassName}`}>
      <style>
        {`
          @keyframes slideUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(calc(-${images.length} * (200px + ${gap}px)));
            }
          }
          @keyframes slideDown {
            0% {
              transform: translateY(calc(-${images.length} * (200px + ${gap}px)));
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div
        className={`flex flex-col absolute ${direction === "up" ? "animate-[slideUp]" : "animate-[slideDown]"} 20s linear infinite w-full`}
        style={{
          gap: `${gap}px`,
          animation: `${direction === 'up' ? 'slideUp' : 'slideDown'} ${duration}s linear infinite`,
        }}
      >
        {/* First set of images */}
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="shrink-0"
          >
            <Image
              className={`rounded-xl w-full h-[200px] md:h-[300px] object-cover`}
              src={image}
              width={300}
              height={300}
              alt={`Slide ${index + 1}`}
              placeholder='blur'
              blurDataURL={image}
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <div
            key={`${image}-${index}-duplicate`}
            className="shrink-0"
          >
            <Image
              className={`rounded-xl w-full h-[200px] md:h-[300px] object-cover`}
              src={image}
              width={300}
              height={300}
              alt={`Slide ${index + 1}`}
              placeholder='blur'
              blurDataURL={image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider