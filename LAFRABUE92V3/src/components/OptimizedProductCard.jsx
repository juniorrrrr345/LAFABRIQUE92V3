import React, { memo, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useImagePreloader } from '../utils/imagePreloader'

const OptimizedProductCard = memo(({ product, index, onPreview, categories, farms }) => {
  // Trouver les noms de catégorie et farm
  const categoryName = useMemo(() => 
    (Array.isArray(categories) && categories.find(c => String(c.id) === String(product.category))?.name) || product.category,
    [categories, product.category]
  )
  
  const farmName = useMemo(() => 
    (Array.isArray(farms) && farms.find(f => String(f.id) === String(product.farm))?.name) || product.farm,
    [farms, product.farm]
  )

  // Construire le tableau de médias
  const allMedias = useMemo(() => {
    const medias = []
    if (product.photo && product.photo.trim()) medias.push(product.photo)
    if (product.image && product.image.trim()) medias.push(product.image)
    if (product.video && product.video.trim()) medias.push(product.video)
    
    if (product.medias && Array.isArray(product.medias)) {
      product.medias.forEach(media => {
        if (media && media.trim() && !medias.includes(media)) {
          medias.push(media)
        }
      })
    }
    return medias
  }, [product.photo, product.image, product.video, product.medias])
  
  const displayImage = useMemo(() => 
    allMedias[0] || product.photo || product.image || product.video,
    [allMedias, product.photo, product.image, product.video]
  )

  // Précharger les images
  const imagesLoaded = useImagePreloader(allMedias)

  // Fonctions de détection de type de média
  const isVideo = useCallback((url) => {
    if (!url) return false
    const videoExtensions = ['.mp4', '.webm', '.mov', '.MOV', '.avi', '.mkv']
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.startsWith('data:video')
  }, [])
  
  const isCloudflareStreamIframe = useCallback((url) => {
    if (!url) return false
    return url.includes('cloudflarestream.com') && url.includes('iframe')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className="neon-border rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm group cursor-pointer"
    >
      {/* Image ou Vidéo */}
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden bg-slate-800" onClick={onPreview}>
        {displayImage ? (
          isCloudflareStreamIframe(displayImage) ? (
            <iframe
              src={displayImage}
              className="w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
              style={{ border: 'none' }}
            />
          ) : isVideo(displayImage) ? (
            <video
              src={displayImage}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🎁
          </div>
        )}
        
        {/* Overlay de chargement */}
        {!imagesLoaded && displayImage && (
          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-theme-heading text-lg font-bold">👁️ Aperçu rapide</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-theme-heading mb-2 group-hover:text-gradient transition-all">
          {product.name}
        </h3>
        <p className="text-theme-secondary text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Catégorie et Farm */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryName && (
            <span className="px-2 py-1 bg-gray-700/30 border border-gray-600/50 rounded-full text-theme-secondary text-xs">
              🏷️ {categoryName}
            </span>
          )}
          {farmName && (
            <span className="px-2 py-1 bg-gray-700/30 border border-gray-600/50 rounded-full text-theme-secondary text-xs">
              🌾 {farmName}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-2">
          {product.variants && product.variants.length > 1 && (
            <p className="text-sm text-theme-secondary">
              {product.variants.length} options
            </p>
          )}
          <Link to={`/products/${product.id}`} className="ml-auto">
            <button className="px-4 py-2 bg-gradient-to-r from-white to-gray-200 rounded-lg text-black font-semibold hover:from-gray-200 hover:to-gray-400 transition-all">
              Voir
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
})

OptimizedProductCard.displayName = 'OptimizedProductCard'

export default OptimizedProductCard