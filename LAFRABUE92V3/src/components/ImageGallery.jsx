import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ImageGallery = ({ medias, productName }) => {
  const [selectedMedia, setSelectedMedia] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Fonction pour détecter si c'est une vidéo
  const isVideo = (url) => {
    if (!url) return false
    const videoExtensions = ['.mp4', '.webm', '.mov', '.MOV', '.avi', '.mkv']
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.startsWith('data:video')
  }
  
  // Fonction pour détecter si c'est un iframe Cloudflare Stream
  const isCloudflareStreamIframe = (url) => {
    if (!url) return false
    return url.includes('cloudflarestream.com') && url.includes('iframe')
  }
  
  const currentMedia = medias[selectedMedia] || medias[0]
  
  // Auto-play slideshow
  React.useEffect(() => {
    if (isPlaying && medias.length > 1) {
      const interval = setInterval(() => {
        setSelectedMedia((prev) => (prev + 1) % medias.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, medias.length])
  
  const handlePrevious = () => {
    setSelectedMedia((prev) => (prev - 1 + medias.length) % medias.length)
  }
  
  const handleNext = () => {
    setSelectedMedia((prev) => (prev + 1) % medias.length)
  }
  
  return (
    <>
      <div className="relative h-full bg-slate-800 rounded-xl overflow-hidden group">
        {/* Media principal */}
        <motion.div
          key={selectedMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative h-full cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          {currentMedia ? (
            isCloudflareStreamIframe(currentMedia) ? (
              <iframe
                src={currentMedia}
                className="w-full h-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                style={{ border: 'none' }}
              />
            ) : isVideo(currentMedia) ? (
              <video
                src={currentMedia}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={currentMedia}
                alt={productName}
                className="w-full h-full object-contain transition-transform duration-300"
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🎁
            </div>
          )}
        </motion.div>
        
        {/* Contrôles de navigation */}
        {medias.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Bouton play/pause pour diaporama */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>
          </>
        )}
        
        {/* Indicateurs */}
        {medias.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {medias.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedMedia(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedMedia
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Miniatures */}
      {medias.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {medias.map((media, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedMedia(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedMedia
                  ? 'border-white shadow-lg'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
            >
              {isVideo(media) ? (
                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
              ) : (
                <img
                  src={media}
                  alt={`${productName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
      
      {/* Modal de zoom */}
      <AnimatePresence>
        {isZoomed && !isVideo(currentMedia) && !isCloudflareStreamIframe(currentMedia) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={currentMedia}
              alt={productName}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-full object-contain cursor-zoom-out"
              onClick={() => setIsZoomed(false)}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery