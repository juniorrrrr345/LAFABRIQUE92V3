/**
 * API Client pour communiquer avec Cloudflare Worker
 */

const API_URL = import.meta.env.VITE_API_URL || 'https://calitekv3.calitek-junior.workers.dev'


// ============ PRODUCTS ============
export const getAll = async (type) => {
  try {
    let response
    
    if (type === 'products') {
      response = await fetch(`${API_URL}/api/products`)
    } else if (type === 'categories') {
      response = await fetch(`${API_URL}/api/categories`)
    } else if (type === 'socials') {
      response = await fetch(`${API_URL}/api/socials`)
    } else if (type === 'settings') {
      response = await fetch(`${API_URL}/api/settings`)
    } else if (type === 'farms') {
      response = await fetch(`${API_URL}/api/farms`)
    } else {
      return []
    }
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data || []
  } catch (error) {
    console.error(`Error fetching ${type}:`, error)
    throw error
  }
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
    let url
    let method
    
    if (type === 'products') {
      method = data.id ? 'PUT' : 'POST'
      url = data.id ? `${API_URL}/api/products/${data.id}` : `${API_URL}/api/products`
    } else if (type === 'categories') {
      method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      url = data.id && data.id !== 'new' ? `${API_URL}/api/categories/${data.id}` : `${API_URL}/api/categories`
    } else if (type === 'socials') {
      method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      url = data.id && data.id !== 'new' ? `${API_URL}/api/socials/${data.id}` : `${API_URL}/api/socials`
    } else if (type === 'settings') {
      method = 'PUT'
      url = data.key ? `${API_URL}/api/settings/${data.key}` : `${API_URL}/api/settings`
    } else if (type === 'farms') {
      method = data.id && data.id !== 'new' ? 'PUT' : 'POST'
      url = data.id && data.id !== 'new' ? `${API_URL}/api/farms/${data.id}` : `${API_URL}/api/farms`
    } else {
      throw new Error(`Type non supporté: ${type}`)
    }
    
    response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      const text = await response.text()
      return { success: true, message: text }
    }
  } catch (error) {
    console.error(`Error saving ${type}:`, error)
    throw error
  }
}

export const remove = async (type, id) => {
  try {
    let response
    
    if (type === 'products') {
      response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE'
      })
    } else if (type === 'categories') {
      response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE'
      })
    } else if (type === 'socials') {
      response = await fetch(`${API_URL}/api/socials/${id}`, {
        method: 'DELETE'
      })
    } else if (type === 'farms') {
      response = await fetch(`${API_URL}/api/farms/${id}`, {
        method: 'DELETE'
      })
    } else {
      throw new Error(`Type non supporté: ${type}`)
    }
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
    }
    
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    } else {
      const text = await response.text()
      return { success: true, message: text }
    }
  } catch (error) {
    console.error(`Error removing ${type}:`, error)
    throw error
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
