/**
 * Système de cache intelligent avec invalidation automatique
 */

class SmartCache {
  constructor() {
    this.cache = new Map()
    this.dependencies = new Map() // Pour tracker les dépendances entre les caches
  }

  set(key, value, options = {}) {
    const { ttl = 300000, dependencies = [], tags = [] } = options // 5 minutes par défaut
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl,
      dependencies,
      tags
    })

    // Enregistrer les dépendances
    dependencies.forEach(dep => {
      if (!this.dependencies.has(dep)) {
        this.dependencies.set(dep, new Set())
      }
      this.dependencies.get(dep).add(key)
    })
  }

  get(key) {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    if (Date.now() - item.timestamp > item.ttl) {
      this.delete(key)
      return null
    }

    return item.value
  }

  delete(key) {
    const item = this.cache.get(key)
    if (item) {
      // Supprimer les dépendances
      item.dependencies.forEach(dep => {
        const deps = this.dependencies.get(dep)
        if (deps) {
          deps.delete(key)
          if (deps.size === 0) {
            this.dependencies.delete(dep)
          }
        }
      })
    }
    
    this.cache.delete(key)
  }

  // Invalider par tag
  invalidateByTag(tag) {
    for (const [key, item] of this.cache.entries()) {
      if (item.tags.includes(tag)) {
        this.delete(key)
      }
    }
  }

  // Invalider par dépendance
  invalidateByDependency(dep) {
    const dependentKeys = this.dependencies.get(dep)
    if (dependentKeys) {
      dependentKeys.forEach(key => this.delete(key))
    }
  }

  // Invalider tout
  clear() {
    this.cache.clear()
    this.dependencies.clear()
  }

  // Statistiques du cache
  getStats() {
    const now = Date.now()
    let valid = 0
    let expired = 0

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        expired++
      } else {
        valid++
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      dependencies: this.dependencies.size
    }
  }
}

export const smartCache = new SmartCache()

// Helper pour les requêtes avec cache intelligent
export const withSmartCache = async (key, fetcher, options = {}) => {
  const cached = smartCache.get(key)
  if (cached) {
    return cached
  }

  const result = await fetcher()
  smartCache.set(key, result, options)
  return result
}