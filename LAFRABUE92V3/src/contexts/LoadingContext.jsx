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

  console.log('LoadingProvider - isLoading:', isLoading, 'progress:', loadingProgress)

  // Simulation du chargement initial de l'application
  useEffect(() => {
    console.log('LoadingProvider - Début du chargement')
    const loadApp = async () => {
      try {
        setLoadingMessage('🚀 Initialisation de votre boutique...')
        setLoadingProgress(10)
        console.log('Étape 1: 10%')
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('⚡ Chargement des composants...')
        setLoadingProgress(25)
        console.log('Étape 2: 25%')
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('✨ Chargement des produits premium...')
        setLoadingProgress(40)
        console.log('Étape 3: 40%')
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('🎨 Application de votre thème personnalisé...')
        setLoadingProgress(55)
        console.log('Étape 4: 55%')
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('🛍️ Préparation de votre expérience shopping...')
        setLoadingProgress(70)
        console.log('Étape 5: 70%')
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('💎 Optimisation des performances...')
        setLoadingProgress(85)
        console.log('Étape 6: 85%')
        await new Promise(resolve => setTimeout(resolve, 500))

        setLoadingMessage('🎉 Finalisation...')
        setLoadingProgress(95)
        console.log('Étape 7: 95%')
        await new Promise(resolve => setTimeout(resolve, 300))

        setLoadingMessage('✅ Prêt !')
        setLoadingProgress(100)
        console.log('Étape 8: 100%')
        await new Promise(resolve => setTimeout(resolve, 200))
        
        console.log('Chargement terminé, passage à isLoading = false')
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

  console.log('LoadingProvider - Valeur du contexte:', value)

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}