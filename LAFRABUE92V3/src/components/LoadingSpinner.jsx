import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', text = 'Chargement...', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-white ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          className="text-theme text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner