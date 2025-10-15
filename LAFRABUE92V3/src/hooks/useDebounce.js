import { useState, useEffect } from 'react'

/**
 * Hook pour débouncer une valeur
 * @param {any} value - La valeur à débouncer
 * @param {number} delay - Le délai en millisecondes
 * @returns {any} - La valeur débouncée
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook pour débouncer une fonction de recherche
 * @param {Function} searchFunction - La fonction de recherche
 * @param {number} delay - Le délai en millisecondes
 * @returns {Function} - La fonction de recherche débouncée
 */
export const useDebouncedSearch = (searchFunction, delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, delay)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchFunction(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, searchFunction])

  return [searchTerm, setSearchTerm]
}