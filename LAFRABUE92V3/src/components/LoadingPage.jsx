import React from 'react'
import { motion } from 'framer-motion'
import { useLoading } from '../contexts/LoadingContext'

const LoadingPage = () => {
  const { loadingMessage, loadingProgress } = useLoading()

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Logo/Icon de chargement sophistiqué */}
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto relative">
            {/* Cercle externe avec gradient animé */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Cercle de chargement principal */}
            <motion.div 
              className="absolute inset-2 border-4 border-transparent border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Cercle secondaire avec direction inverse */}
            <motion.div 
              className="absolute inset-4 border-3 border-transparent border-b-pink-300 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Cercle intérieur avec pulsation */}
            <motion.div 
              className="absolute inset-6 border-2 border-transparent border-r-blue-300 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Point central animé */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50" />
            </motion.div>
          </div>
        </div>

        {/* Texte de chargement avec animation sophistiquée */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          animate={{ 
            opacity: [0.7, 1, 0.7],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {loadingMessage}
        </motion.h2>
        
        {/* Sous-titre avec effet de brillance */}
        <motion.p 
          className="text-white/80 text-xl mb-12 relative"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="bg-gradient-to-r from-white/60 via-white to-white/60 bg-clip-text text-transparent">
            Préparation de votre boutique
          </span>
        </motion.p>

        {/* Barre de progression avec effet de brillance */}
        <div className="w-80 mx-auto mb-8">
          <div className="relative bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 h-full rounded-full relative"
              style={{ width: `${loadingProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Effet de brillance qui se déplace */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          <motion.div 
            className="text-white/90 text-lg mt-4 font-semibold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            {loadingProgress}%
          </motion.div>
        </div>

        {/* Points de chargement avec animation en vague sophistiquée */}
        <div className="flex justify-center space-x-3">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Texte d'encouragement avec animation */}
        <motion.p 
          className="text-white/60 text-sm mt-8"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          Quelques instants de patience...
        </motion.p>
      </div>
    </div>
  )
}

export default LoadingPage