import React from 'react'
import { motion } from 'framer-motion'

// Composant de particules flottantes
export const FloatingParticles = ({ count = 20, size = 'small' }) => {
  const sizeClasses = {
    small: 'w-1 h-1',
    medium: 'w-2 h-2',
    large: 'w-3 h-3'
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${sizeClasses[size]} bg-white/30 rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [0.5, 1.5, 0.5],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Composant de spirale de chargement
export const SpiralLoader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  return (
    <div className={`${sizeClasses[size]} mx-auto relative`}>
      {/* Spirale externe */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Spirale moyenne */}
      <motion.div
        className="absolute inset-2 rounded-full border-3 border-transparent border-b-pink-400"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Spirale interne */}
      <motion.div
        className="absolute inset-4 rounded-full border-2 border-transparent border-r-blue-400"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Point central */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg" />
      </motion.div>
    </div>
  )
}

// Composant de barres de chargement animées
export const AnimatedBars = ({ count = 8, height = 'h-8' }) => {
  return (
    <div className="flex items-end justify-center space-x-1">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 ${height} bg-gradient-to-t from-purple-400 to-pink-400 rounded-full`}
          animate={{
            scaleY: [0.3, 1, 0.3],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Composant de pulsation concentrique
export const ConcentricPulse = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-28 h-28',
    large: 'w-36 h-36'
  }

  return (
    <div className={`${sizeClasses[size]} mx-auto relative`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Point central */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </motion.div>
    </div>
  )
}

// Composant de chargement avec effet de vague
export const WaveLoader = ({ count = 5, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  }

  return (
    <div className="flex justify-center space-x-2">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg`}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 1, 0.4],
            y: [0, -12, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Composant de chargement avec rotation orbitale
export const OrbitalLoader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-28 h-28',
    large: 'w-36 h-36'
  }

  return (
    <div className={`${sizeClasses[size]} mx-auto relative`}>
      {/* Cercle central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
      </div>
      
      {/* Particules orbitantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/60 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: '0 0',
          }}
          animate={{
            rotate: [0, 360],
            x: [0, 60, 0],
            y: [0, 0, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Composant de chargement avec effet de respiration
export const BreathingLoader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} mx-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Composant principal qui combine plusieurs animations
export const AdvancedLoadingAnimation = ({ type = 'spiral', size = 'medium' }) => {
  const animations = {
    spiral: <SpiralLoader size={size} />,
    bars: <AnimatedBars size={size} />,
    pulse: <ConcentricPulse size={size} />,
    wave: <WaveLoader size={size} />,
    orbital: <OrbitalLoader size={size} />,
    breathing: <BreathingLoader size={size} />
  }

  return (
    <div className="relative">
      <FloatingParticles count={15} size="small" />
      {animations[type] || animations.spiral}
    </div>
  )
}