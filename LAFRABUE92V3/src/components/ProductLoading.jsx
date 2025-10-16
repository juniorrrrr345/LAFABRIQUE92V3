import React from 'react'
import { motion } from 'framer-motion'

const ProductLoading = ({ message = "Chargement des produits...", progress = 0 }) => {
  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center relative overflow-hidden">
      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Animation de chargement ultra sophistiquée */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Cercle externe avec gradient animé et rotation */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-25"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Cercle de chargement principal avec effet de vague */}
            <motion.div 
              className="absolute inset-2 border-4 border-transparent border-t-purple-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Cercle secondaire avec direction inverse et effet de pulsation */}
            <motion.div 
              className="absolute inset-4 border-3 border-transparent border-b-pink-400 rounded-full"
              animate={{ 
                rotate: -360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            {/* Cercle intérieur avec pulsation et rotation */}
            <motion.div 
              className="absolute inset-6 border-2 border-transparent border-r-blue-400 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3],
                rotate: 360
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Point central avec effet de respiration */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-2xl shadow-purple-500/50" />
            </motion.div>

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
        </div>

        {/* Message de chargement avec animation sophistiquée */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          animate={{ 
            opacity: [0.6, 1, 0.6],
            y: [0, -8, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {message}
          </span>
        </motion.h2>
        
        {/* Sous-titre avec effet de brillance */}
        <motion.p 
          className="text-white/80 text-xl mb-12"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <span className="bg-gradient-to-r from-white/60 via-white to-white/60 bg-clip-text text-transparent">
            Préparation de votre sélection
          </span>
        </motion.p>

        {/* Barre de progression avec effet de brillance amélioré */}
        <div className="w-96 mx-auto mb-8">
          <div className="relative bg-white/15 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
            <motion.div 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 h-full rounded-full relative"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Effet de brillance qui se déplace */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Effet de pulsation sur la barre */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
          <motion.div 
            className="text-white/90 text-lg mt-4 font-semibold"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Points de chargement avec animation en vague sophistiquée */}
        <div className="flex justify-center space-x-3 mb-8">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 1, 0.4],
                y: [0, -12, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Texte d'encouragement avec animation */}
        <motion.p 
          className="text-white/70 text-base"
          animate={{ 
            opacity: [0.4, 1, 0.4],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          Quelques instants de patience...
        </motion.p>

        {/* Indicateur de chargement supplémentaire */}
        <motion.div 
          className="mt-6 flex justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex space-x-1">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-8 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
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
        </motion.div>
      </div>
    </div>
  )
}

export default ProductLoading