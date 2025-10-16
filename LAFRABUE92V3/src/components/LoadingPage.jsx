import React, { useState, useEffect } from 'react'
import { useLoading } from '../contexts/LoadingContext'

const LoadingPage = () => {
  const { loadingMessage, loadingProgress } = useLoading()
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    "✨ Découvrez nos produits d'exception",
    "🛍️ Livraison rapide et sécurisée", 
    "💎 Qualité premium garantie",
    "🌟 Service client exceptionnel"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [tips.length])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-spin">
            <span className="text-3xl">🛍️</span>
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Bienvenue !
        </h1>

        {/* Message de chargement */}
        <h2 className="text-xl text-white mb-6">
          {loadingMessage}
        </h2>
        
        {/* Conseil */}
        <p className="text-white/80 text-lg mb-8">
          {tips[currentTip]}
        </p>

        {/* Barre de progression */}
        <div className="w-80 mx-auto mb-4">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>

        {/* Pourcentage */}
        <div className="text-white text-2xl font-bold mb-4">
          {loadingProgress}%
        </div>

        {/* Points de chargement */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage