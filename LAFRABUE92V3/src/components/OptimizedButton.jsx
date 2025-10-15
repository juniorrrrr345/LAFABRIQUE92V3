import React, { memo } from 'react'
import { motion } from 'framer-motion'

const OptimizedButton = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-200 hover:to-gray-400',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClasses = variants[variant] || variants.primary
  const sizeClasses = sizes[size] || sizes.md

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
          <span>Chargement...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
})

OptimizedButton.displayName = 'OptimizedButton'

export default OptimizedButton