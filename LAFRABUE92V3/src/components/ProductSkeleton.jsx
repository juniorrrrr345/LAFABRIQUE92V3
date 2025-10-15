import React from 'react'
import { motion } from 'framer-motion'

const ProductSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="neon-border rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm"
        >
          {/* Image skeleton */}
          <div className="relative h-32 sm:h-48 md:h-64 lg:h-72 bg-slate-800 overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 100%',
                backgroundImage: 'linear-gradient(90deg, #475569 0%, #64748b 50%, #475569 100%)'
              }}
            />
            
            {/* Overlay shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Content skeleton */}
          <div className="p-3 sm:p-4 lg:p-6 space-y-3">
            {/* Title skeleton */}
            <div className="space-y-2">
              <motion.div
                className="h-4 sm:h-5 bg-slate-700 rounded"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              />
              <motion.div
                className="h-3 sm:h-4 bg-slate-700 rounded w-3/4"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1 + 0.2
                }}
              />
            </div>

            {/* Description skeleton */}
            <div className="space-y-1">
              <motion.div
                className="h-3 bg-slate-700 rounded"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1 + 0.4
                }}
              />
              <motion.div
                className="h-3 bg-slate-700 rounded w-2/3"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1 + 0.6
                }}
              />
            </div>

            {/* Tags skeleton */}
            <div className="flex gap-2">
              <motion.div
                className="h-6 bg-slate-700 rounded-full w-16"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1 + 0.8
                }}
              />
              <motion.div
                className="h-6 bg-slate-700 rounded-full w-20"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1 + 1.0
                }}
              />
            </div>

            {/* Button skeleton */}
            <motion.div
              className="h-8 bg-slate-700 rounded-lg w-20 ml-auto"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1 + 1.2
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ProductSkeleton