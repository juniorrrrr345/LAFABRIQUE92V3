import React, { createContext, useContext, useState, useEffect } from 'react'

const LoadingContext = createContext()

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

// Désactivé: l'écran de chargement global n'est plus utilisé
export const LoadingProvider = ({ children }) => {
  const value = {
    isLoading: false,
    loadingMessage: '',
    loadingProgress: 100,
    startLoading: () => {},
    stopLoading: () => {},
    updateProgress: () => {}
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}