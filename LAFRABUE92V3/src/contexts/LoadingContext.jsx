import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

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
  const [loadingSteps, setLoadingSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)

  // Configuration des étapes de chargement avec messages plus élégants
  const loadingStepsConfig = [
    { message: 'Initialisation du système...', progress: 15, duration: 800 },
    { message: 'Chargement des paramètres...', progress: 30, duration: 600 },
    { message: 'Connexion à la base de données...', progress: 45, duration: 700 },
    { message: 'Récupération des données...', progress: 60, duration: 800 },
    { message: 'Préparation de l\'interface...', progress: 75, duration: 600 },
    { message: 'Optimisation des performances...', progress: 85, duration: 500 },
    { message: 'Finalisation...', progress: 95, duration: 400 },
    { message: 'Prêt!', progress: 100, duration: 300 }
  ]

  // Simulation du chargement initial de l'application avec étapes fluides
  useEffect(() => {
    const loadApp = async () => {
      try {
        setLoadingSteps(loadingStepsConfig)
        
        for (let i = 0; i < loadingStepsConfig.length; i++) {
          const step = loadingStepsConfig[i]
          setCurrentStep(i)
          setLoadingMessage(step.message)
          
          // Animation fluide de la progression
          const progressIncrement = step.progress - loadingProgress
          const steps = 20
          const increment = progressIncrement / steps
          
          for (let j = 0; j < steps; j++) {
            setLoadingProgress(prev => Math.min(prev + increment, step.progress))
            await new Promise(resolve => setTimeout(resolve, step.duration / steps))
          }
          
          setLoadingProgress(step.progress)
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        // Délai final pour l'effet de finition
        await new Promise(resolve => setTimeout(resolve, 500))
        
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

  const startLoading = useCallback((message = 'Chargement...') => {
    // Ne pas afficher le chargement global si l'app a déjà été chargée une fois
    if (hasLoadedOnce) {
      return
    }
    setIsLoading(true)
    setLoadingMessage(message)
    setLoadingProgress(0)
  }, [hasLoadedOnce])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingProgress(100)
  }, [])

  const updateProgress = useCallback((progress, message) => {
    setLoadingProgress(prev => {
      // Animation fluide de la progression
      const diff = progress - prev
      if (Math.abs(diff) > 5) {
        // Si la différence est importante, animer progressivement
        const steps = 10
        const increment = diff / steps
        let current = prev
        const interval = setInterval(() => {
          current += increment
          if (Math.abs(current - progress) < 1) {
            current = progress
            clearInterval(interval)
          }
          setLoadingProgress(current)
        }, 50)
        return prev
      }
      return progress
    })
    
    if (message) {
      setLoadingMessage(message)
    }
  }, [])

  const value = {
    isLoading: hasLoadedOnce ? false : isLoading,
    loadingMessage,
    loadingProgress,
    loadingSteps,
    currentStep,
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