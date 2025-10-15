/**
 * API Client pour communiquer avec Cloudflare Worker
 * Avec gestion d'erreur robuste et cache pour les performances
 */

import { localCache, withCache } from './cache'

const API_URL = import.meta.env.VITE_API_URL || 'https://calitekv3.calitek-junior.workers.dev'

// Fonction pour gérer les erreurs de fetch
async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response
  } catch (error) {
    console.error('Erreur de connexion API:', error)
    throw new Error(`Impossible de se connecter à l'API: ${error.message}`)
  }
}


// ============ PRODUCTS ============
export const getAll = async (type) => {
  return withCache(
    `getAll_${type}`,
    async () => {
      try {
        let response
        if (type === 'products') {
          response = await safeFetch(`${API_URL}/api/products`)
        } else if (type === 'categories') {
          response = await safeFetch(`${API_URL}/api/categories`)
        } else if (type === 'socials') {
          response = await safeFetch(`${API_URL}/api/socials`)
        } else if (type === 'settings') {
          response = await safeFetch(`${API_URL}/api/settings`)
        } else if (type === 'farms') {
          response = await safeFetch(`${API_URL}/api/farms`)
        } else {
          return []
        }
        
        return await response.json()
      } catch (error) {
        console.error(`Erreur lors du chargement des ${type}:`, error)
        // Retourner des données vides en cas d'erreur pour éviter les crashes
        return []
      }
    },
    30000 // 30 secondes de cache
  )
}

export const getById = async (type, id) => {
  if (type === 'products') {
    const response = await fetch(`${API_URL}/api/products/${id}`)
    return await response.json()
  }
  
  if (type === 'settings') {
    const response = await fetch(`${API_URL}/api/settings/${id}`)
    return await response.json()
  }
  
  return null
}

export const save = async (type, data) => {
  try {
    let response
    if (type === 'products') {
      const method = data.id ? 'PUT' : 'POST'
      const url = data.id ? `${API_URL}/api/products/${data.id}` : `${API_URL}/api/products`
      
      response = await safeFetch(url, {
        method,
        body: JSON.stringify(data)
      })
    } else if (type === 'categories') {
      const method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      const url = data.id && data.id !== 'new' ? `${API_URL}/api/categories/${data.id}` : `${API_URL}/api/categories`
      
      response = await safeFetch(url, {
        method,
        body: JSON.stringify(data)
      })
    } else if (type === 'socials') {
      const method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      const url = data.id && data.id !== 'new' ? `${API_URL}/api/socials/${data.id}` : `${API_URL}/api/socials`
      
      response = await safeFetch(url, {
        method,
        body: JSON.stringify(data)
      })
    } else if (type === 'settings') {
      const url = data.key ? `${API_URL}/api/settings/${data.key}` : `${API_URL}/api/settings`
      response = await safeFetch(url, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
    } else if (type === 'farms') {
      const method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      const url = data.id && data.id !== 'new' ? `${API_URL}/api/farms/${data.id}` : `${API_URL}/api/farms`
      
      response = await safeFetch(url, {
        method,
        body: JSON.stringify(data)
      })
    }
    
    const result = await response.json()
    
    // Invalider le cache pour ce type
    localCache.invalidatePattern(`getAll_${type}`)
    
    return result
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde ${type}:`, error)
    throw error
  }
}

export const remove = async (type, id) => {
  if (type === 'products') {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }
  
  if (type === 'categories') {
    const response = await fetch(`${API_URL}/api/categories/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }
  
  if (type === 'socials') {
    const response = await fetch(`${API_URL}/api/socials/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }
  
  if (type === 'farms') {
    const response = await fetch(`${API_URL}/api/farms/${id}`, {
      method: 'DELETE'
    })
    return await response.json()
  }
}

// ============ R2 UPLOAD ============
export const uploadToR2 = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: formData
  })
  
  return await response.json()
}

// ============ INIT DATABASE ============
export const initDatabase = async () => {
  const response = await fetch(`${API_URL}/api/init`)
  return await response.json()
}
