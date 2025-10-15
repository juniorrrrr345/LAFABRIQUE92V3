import React from 'react'
import { motion } from 'framer-motion'
import { AdvancedLoadingAnimation, FloatingParticles, AnimatedBars } from './LoadingAnimations'

const ProductLoading = ({ message = "Chargement des produits...", progress = 0 }) => {
  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center relative overflow-hidden">
      {/* Particules flottantes en arrière-plan */}
      <FloatingParticles count={20} size="small" />

      <div className="text-center relative z-10">
        {/* Animation de chargement ultra sophistiquée */}
        <div className="mb-12 relative">
          <AdvancedLoadingAnimation type="orbital" size="large" />
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
        <div className="mb-8">
          <AdvancedLoadingAnimation type="wave" size="large" />
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
          <AnimatedBars count={8} height="h-8" />
        </motion.div>
      </div>
    </div>
  )
}

export default ProductLoading