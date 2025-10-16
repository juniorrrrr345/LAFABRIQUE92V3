import React, { useState, useEffect } from 'react'

const LoadingPage = () => {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Chargement de votre boutique...')

  useEffect(() => {
    const loadApp = async () => {
      setMessage('🚀 Initialisation...')
      setProgress(10)
      await new Promise(resolve => setTimeout(resolve, 500))

      setMessage('⚡ Chargement des composants...')
      setProgress(25)
      await new Promise(resolve => setTimeout(resolve, 500))

      setMessage('✨ Chargement des produits...')
      setProgress(40)
      await new Promise(resolve => setTimeout(resolve, 500))

      setMessage('🎨 Application du thème...')
      setProgress(55)
      await new Promise(resolve => setTimeout(resolve, 500))

      setMessage('🛍️ Préparation de l\'expérience...')
      setProgress(70)
      await new Promise(resolve => setTimeout(resolve, 500))

      setMessage('💎 Optimisation...')
      setProgress(85)
      await new Promise(resolve => setTimeout(resolve, 500))

      setMessage('🎉 Finalisation...')
      setProgress(95)
      await new Promise(resolve => setTimeout(resolve, 300))

      setMessage('✅ Prêt !')
      setProgress(100)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    loadApp()
  }, [])

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
          {message}
        </h2>

        {/* Barre de progression */}
        <div className="w-80 mx-auto mb-4">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pourcentage */}
        <div className="text-white text-2xl font-bold mb-4">
          {progress}%
        </div>

        {/* Points de chargement */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
        </div>

        {/* Message d'encouragement */}
        <p className="text-white/60 text-sm mt-8">
          Préparez-vous à une expérience shopping exceptionnelle !
        </p>
      </div>
    </div>
  )
}

function App() {
  return <LoadingPage />
}

export default App