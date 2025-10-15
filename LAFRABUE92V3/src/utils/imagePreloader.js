/**
 * Système de préchargement d'images pour améliorer les performances
 */

class ImagePreloader {
  constructor() {
    this.cache = new Map()
    this.loading = new Set()
  }

  async preloadImage(src) {
    if (this.cache.has(src)) {
      return this.cache.get(src)
    }

    if (this.loading.has(src)) {
      // Attendre que l'image en cours de chargement se termine
      return new Promise((resolve) => {
        const checkLoading = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src))
          } else if (!this.loading.has(src)) {
            resolve(null)
          } else {
            setTimeout(checkLoading, 50)
          }
        }
        checkLoading()
      })
    }

    this.loading.add(src)

    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        this.cache.set(src, img)
        this.loading.delete(src)
        resolve(img)
      }
      
      img.onerror = () => {
        this.loading.delete(src)
        resolve(null)
      }
      
      img.src = src
    })
  }

  async preloadImages(urls) {
    const promises = urls.map(url => this.preloadImage(url))
    return Promise.all(promises)
  }

  isLoaded(src) {
    return this.cache.has(src)
  }

  clear() {
    this.cache.clear()
    this.loading.clear()
  }
}

export const imagePreloader = new ImagePreloader()

// Hook pour précharger les images d'un produit
export const useImagePreloader = (urls) => {
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    if (!urls || urls.length === 0) {
      setLoaded(true)
      return
    }

    const preload = async () => {
      await imagePreloader.preloadImages(urls)
      setLoaded(true)
    }

    preload()
  }, [urls])

  return loaded
}