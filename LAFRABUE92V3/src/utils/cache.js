/**
 * Système de cache local pour améliorer les performances
 */

class LocalCache {
  constructor() {
    this.cache = new Map()
    this.defaultTTL = 5 * 60 * 1000 // 5 minutes par défaut
  }

  set(key, value, ttl = this.defaultTTL) {
    const expiresAt = Date.now() + ttl
    this.cache.set(key, {
      value,
      expiresAt
    })
  }

  get(key) {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  has(key) {
    return this.get(key) !== null
  }

  delete(key) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  // Invalider le cache pour un pattern
  invalidatePattern(pattern) {
    const regex = new RegExp(pattern)
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }
}

export const localCache = new LocalCache()

// Helper pour les requêtes avec cache
export const withCache = async (key, fetcher, ttl) => {
  const cached = localCache.get(key)
  if (cached) {
    return cached
  }

  const result = await fetcher()
  localCache.set(key, result, ttl)
  return result
}