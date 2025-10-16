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
  const [isLoading, setIsLoading] = useState(false) // Désactivé par défaut
  const [loadingMessage, setLoadingMessage] = useState('Chargement de votre boutique...')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true) // Déjà chargé

  // Chargement initial désactivé
  useEffect(() => {
    // Ne rien faire - pas de chargement au démarrage
    setIsLoading(false)
    setHasLoadedOnce(true)
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