import React, { useState, useEffect } from 'react'
import { useLoading } from '../contexts/LoadingContext'

const LoadingPage = () => {
  const { loadingMessage, loadingProgress } = useLoading()
  const [currentTip, setCurrentTip] = useState(0)
  const [particles, setParticles] = useState([])
  const [loadingDots, setLoadingDots] = useState('')
  const [isAnimating, setIsAnimating] = useState(true)

  // Conseils motivants pour la boutique
  const tips = [
    "✨ Découvrez nos produits d'exception",
    "🛍️ Livraison rapide et sécurisée", 
    "💎 Qualité premium garantie",
    "🌟 Service client exceptionnel",
    "🎁 Offres exclusives en cours",
    "🚀 Innovation et tendances",
    "💝 Satisfaction client 100%",
    "🔥 Nouveautés chaque semaine",
    "🎨 Design moderne et élégant",
    "⚡ Performance optimisée"
  ]

  // Générer des particules flottantes plus dynamiques
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          speed: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: ['purple', 'pink', 'blue', 'cyan', 'yellow'][Math.floor(Math.random() * 5)]
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  // Animation des points de chargement
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Changer de conseil toutes les 2 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [tips.length])

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Fond de thème dynamique avec effet de vague */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-pink-900/30"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-purple-500/30 to-transparent animate-wave"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-pink-500/15 to-transparent rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Particules flottantes colorées */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-pulse bg-${particle.color}-400/30`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.speed}s`,
              opacity: particle.opacity,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grille de fond animée */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/10 animate-pulse"
              style={{
                animationDelay: `${(i % 12) * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo principal avec animation améliorée */}
        <div className="mb-12">
          <div className="relative">
            {/* Cercles concentriques animés */}
            <div className="w-40 h-40 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 rotate-slow opacity-80"></div>
              <div className="absolute inset-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 rotate-slow opacity-70" style={{animationDirection: 'reverse', animationDuration: '6s'}}></div>
              <div className="absolute inset-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 rotate-slow opacity-60" style={{animationDuration: '4s'}}></div>
              <div className="absolute inset-9 rounded-full bg-slate-900 flex items-center justify-center pulse-glow">
                <div className="text-5xl float-gentle">🛍️</div>
              </div>
            </div>
            
            {/* Effet de glow dynamique autour du logo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Particules orbitantes autour du logo */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full animate-orbit bg-${['purple', 'pink', 'blue', 'cyan'][i % 4]}-400`}
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '4s',
                    transformOrigin: '80px 80px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Titre principal avec effet de glow amélioré */}
        <h1 className={`text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6 ${isAnimating ? 'animate-bounce' : 'fade-in-up'}`}>
          Bienvenue !
        </h1>

        {/* Message de chargement dynamique avec points animés */}
        <h2 className="text-2xl font-semibold text-white mb-6 fade-in-up" style={{animationDelay: '0.2s'}}>
          {loadingMessage}{loadingDots}
        </h2>
        
        {/* Conseil motivant avec transition fluide */}
        <div className="mb-8 h-12 flex items-center justify-center">
          <p className="text-white/90 text-xl font-medium fade-in-up transition-all duration-500" style={{animationDelay: '0.4s'}}>
            {tips[currentTip]}
          </p>
        </div>

        {/* Barre de progression moderne améliorée */}
        <div className="w-96 mx-auto mb-8 fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="relative">
            {/* Barre de fond avec effet de glow et bordure animée */}
            <div className="bg-white/10 rounded-full h-6 overflow-hidden backdrop-blur-sm border-2 border-white/30 pulse-glow relative">
              {/* Barre de progression avec gradient animé */}
              <div 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out relative shimmer-effect"
                style={{ width: `${loadingProgress}%` }}
              >
                {/* Effet de brillance animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                {/* Particules dans la barre */}
                <div className="absolute inset-0">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Indicateur de progression circulaire */}
              <div className="absolute -right-2 -top-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center pulse-glow">
                <div className="text-white text-xs font-bold">{loadingProgress}%</div>
              </div>
            </div>
            
            {/* Pourcentage principal avec animation de compteur */}
            <div className="text-white text-2xl font-bold mt-4 fade-in-up">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {loadingProgress}%
              </span>
            </div>
            
            {/* Barre de progression secondaire (mini) */}
            <div className="w-64 mx-auto mt-2">
              <div className="bg-white/5 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de chargement avec points animés améliorés */}
        <div className="flex justify-center space-x-4 fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce pulse-glow" style={{animationDelay: '0ms'}}></div>
          <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-bounce pulse-glow" style={{animationDelay: '200ms'}}></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce pulse-glow" style={{animationDelay: '400ms'}}></div>
          <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-yellow-400 rounded-full animate-bounce pulse-glow" style={{animationDelay: '600ms'}}></div>
        </div>

        {/* Spinner de chargement circulaire */}
        <div className="mt-6 fade-in-up" style={{animationDelay: '1s'}}>
          <div className="w-12 h-12 mx-auto relative">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-4 border-transparent border-r-pink-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
        </div>

        {/* Message d'encouragement avec animation */}
        <div className="mt-8 text-white/70 text-base fade-in-up" style={{animationDelay: '1.2s'}}>
          <p className="animate-pulse">Préparez-vous à une expérience shopping exceptionnelle !</p>
        </div>
      </div>

    </div>
  )
}

export default LoadingPage