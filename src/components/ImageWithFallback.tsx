import React, { useState, useRef, useEffect } from 'react';
import { Building2 } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText = 'Milaan Architectural Photography',
  className = '',
  containerClassName = '',
  priority = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  // Priority hero images must be visible immediately without opacity-0 flash
  const [isLoaded, setIsLoaded] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setHasError(false);
    // If the image is already complete in browser cache or memory, mark as loaded immediately
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else if (imgRef.current.naturalWidth === 0 && imgRef.current.src) {
        setHasError(true);
      }
    } else if (priority) {
      setIsLoaded(true);
    }
  }, [src, priority]);

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${containerClassName}`}>
      {!hasError ? (
        <>
          {/* Subtle placeholder only for non-priority lazy images while pending */}
          {!isLoaded && !priority && (
            <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase text-neutral-600 font-mono">Loading View...</span>
            </div>
          )}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={(e) => {
              setIsLoaded(true);
              props.onLoad?.(e);
            }}
            onError={(e) => {
              setHasError(true);
              props.onError?.(e);
            }}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded || priority ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            {...props}
          />
        </>
      ) : (
        /* Graceful architectural fallback container if external network fails */
        <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-neutral-800 to-neutral-950 border border-neutral-800">
          <div className="w-12 h-12 rounded-full border border-neutral-700/60 flex items-center justify-center text-neutral-400 mb-3 bg-neutral-900/60">
            <Building2 className="w-5 h-5 text-amber-200/80" />
          </div>
          <p className="text-xs tracking-widest uppercase text-neutral-400 font-medium mb-1 font-mono">
            {fallbackText}
          </p>
          <p className="text-xs text-neutral-500 max-w-xs">{alt}</p>
        </div>
      )}
    </div>
  );
};
