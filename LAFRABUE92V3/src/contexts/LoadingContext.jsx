import React, { createContext, useContext, useState, useEffect } from 'react'

const LoadingContext = createContext()

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Chargement de votre boutique...')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)

  // Simulation du chargement initial de l'application
  useEffect(() => {
    const loadApp = async () => {
      try {
        setLoadingMessage('🚀 Initialisation de votre boutique...')
        setLoadingProgress(10)
        await new Promise(resolve => setTimeout(resolve, 800))

        setLoadingMessage('⚡ Chargement des composants...')
        setLoadingProgress(25)
        await new Promise(resolve => setTimeout(resolve, 700))

        setLoadingMessage('✨ Chargement des produits premium...')
        setLoadingProgress(40)
        await new Promise(resolve => setTimeout(resolve, 800))

        setLoadingMessage('🎨 Application de votre thème personnalisé...')
        setLoadingProgress(55)
        await new Promise(resolve => setTimeout(resolve, 700))

        setLoadingMessage('🛍️ Préparation de votre expérience shopping...')
        setLoadingProgress(70)
        await new Promise(resolve => setTimeout(resolve, 600))

        setLoadingMessage('💎 Optimisation des performances...')
        setLoadingProgress(85)
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('🎉 Finalisation...')
        setLoadingProgress(95)
        await new Promise(resolve => setTimeout(resolve, 400))

        setLoadingMessage('✅ Prêt !')
        setLoadingProgress(100)
        await new Promise(resolve => setTimeout(resolve, 300))
        
        setIsLoading(false)
        setHasLoadedOnce(true)
      } catch (error) {
        console.error('Erreur lors du chargement:', error)
        setIsLoading(false)
        setHasLoadedOnce(true)
      }
    }

    loadApp()
  }, [])

  const startLoading = (message = 'Chargement...') => {
    // Ne pas afficher le chargement global si l'app a déjà été chargée une fois
    if (hasLoadedOnce) {
      return
    }
    setIsLoading(true)
    setLoadingMessage(message)
    setLoadingProgress(0)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setLoadingProgress(100)
  }

  const updateProgress = (progress, message) => {
    setLoadingProgress(progress)
    if (message) {
      setLoadingMessage(message)
    }
  }

  const value = {
    isLoading: hasLoadedOnce ? false : isLoading,
    loadingMessage,
    loadingProgress,
    startLoading,
    stopLoading,
    updateProgress
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}