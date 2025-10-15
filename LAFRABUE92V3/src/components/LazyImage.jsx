import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const LazyImage = ({ src, alt, className = '', placeholder = '🎁', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {!isInView ? (
        // Placeholder pendant le chargement
        <div className="w-full h-full flex items-center justify-center bg-slate-800">
          <span className="text-6xl">{placeholder}</span>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          
          {hasError ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-800">
              <span className="text-6xl">{placeholder}</span>
            </div>
          ) : (
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onLoad={handleLoad}
              onError={handleError}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default LazyImage