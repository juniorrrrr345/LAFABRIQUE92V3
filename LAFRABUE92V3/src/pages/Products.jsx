import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import OptimizedProductCard from '../components/OptimizedProductCard'
import { useDebounce } from '../hooks/useDebounce'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedFarm, setSelectedFarm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [previewProduct, setPreviewProduct] = useState(null)
  
  // Débouncer la recherche pour améliorer les performances
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    fetchData()
  }, [])

  // Lire les paramètres d'URL au chargement
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const farmParam = searchParams.get('farm')
    
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    if (farmParam) {
      setSelectedFarm(farmParam)
    }
  }, [searchParams])

  useEffect(() => {
    filterProducts()
  }, [debouncedSearchTerm, selectedCategory, selectedFarm, allProducts])

  const fetchData = useCallback(async () => {
    try {
      const { getAll } = await import('../utils/api')
      
      // Charger les données en parallèle pour de meilleures performances
      const [productsData, categoriesData, farmsData] = await Promise.all([
        getAll('products'),
        getAll('categories'),
        getAll('farms')
      ])
      
      setAllProducts(productsData)
      setProducts(productsData)
      setCategories(categoriesData)
      setFarms(farmsData)
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  const filterProducts = useCallback(() => {
    let filtered = [...allProducts]

    // Filtre par recherche
    if (debouncedSearchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    }

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(product => String(product.category) === String(selectedCategory))
    }

    // Filtre par farm
    if (selectedFarm) {
      filtered = filtered.filter(product => String(product.farm) === String(selectedFarm))
    }

    setProducts(filtered)
  }, [allProducts, debouncedSearchTerm, selectedCategory, selectedFarm])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedFarm('')
  }

  if (loading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des produits..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-bg">
      <div className="pt-20 pb-8 sm:pb-16 lg:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 flex flex-col items-center"
          >
            <div className="inline-block bg-black/90 backdrop-blur-xl rounded-full px-16 py-10 border-2 border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-3 text-white">
                Notre Boutique
              </h1>
              <p className="text-lg text-gray-300">
                Découvrez notre sélection de produits choisis avec amour
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="max-w-3xl mx-auto w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="w-full px-6 py-4 pr-24 bg-slate-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <span>🔍</span>
                  <span className="hidden md:inline">Filtres</span>
                </button>
              </div>

              {/* Filtres déroulants */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-slate-900/50 border border-gray-700 rounded-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtre catégorie */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Catégorie</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                      >
                        <option value="">Toutes les catégories</option>
                        {Array.isArray(categories) && categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Filtre farm */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Farm</label>
                      <select
                        value={selectedFarm}
                        onChange={(e) => setSelectedFarm(e.target.value)}
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                      >
                        <option value="">Toutes les farms</option>
                        {Array.isArray(farms) && farms.map((farm) => (
                          <option key={farm.id} value={farm.id}>
                            {farm.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bouton réinitialiser */}
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Réinitialiser
                      </button>
                    </div>
                  </div>

                  {/* Résumé des filtres */}
                  {(searchTerm || selectedCategory || selectedFarm) && (
                    <div className="mt-3 text-sm text-gray-400">
                      {products.length} produit(s) trouvé(s)
                      {searchTerm && ` pour "${searchTerm}"`}
                      {selectedCategory && ` dans ${selectedCategory}`}
                      {selectedFarm && ` de ${selectedFarm}`}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">Aucun produit disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {Array.isArray(products) && products.map((product, index) => (
                <OptimizedProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  categories={categories}
                  farms={farms}
                  onPreview={() => setPreviewProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Aperçu */}
      <AnimatePresence>
        {previewProduct && (
          <ProductPreview 
            product={previewProduct} 
            categories={categories}
            farms={farms}
            onClose={() => setPreviewProduct(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

const ProductCard = React.memo(({ product, index, onPreview, categories, farms }) => {
  // Trouver les noms de catégorie et farm (convertir en string pour la comparaison)
  const categoryName = useMemo(() => 
    (Array.isArray(categories) && categories.find(c => String(c.id) === String(product.category))?.name) || product.category,
    [categories, product.category]
  )
  const farmName = useMemo(() => 
    (Array.isArray(farms) && farms.find(f => String(f.id) === String(product.farm))?.name) || product.farm,
    [farms, product.farm]
  )
  
  // Construire le tableau de médias - PHOTO EN PREMIER pour affichage carte
  const allMedias = useMemo(() => {
    const medias = []
    if (product.photo && product.photo.trim()) medias.push(product.photo)
    if (product.image && product.image.trim()) medias.push(product.image)
    if (product.video && product.video.trim()) medias.push(product.video)
    
    // Vérifier aussi dans medias si c'est un tableau
    if (product.medias && Array.isArray(product.medias)) {
      product.medias.forEach(media => {
        if (media && media.trim() && !medias.includes(media)) {
          medias.push(media)
        }
      })
    }
    return medias
  }, [product.photo, product.image, product.video, product.medias])
  
  // Afficher le premier média disponible (photo en priorité)
  const displayImage = useMemo(() => 
    allMedias[0] || product.photo || product.image || product.video,
    [allMedias, product.photo, product.image, product.video]
  )
  const basePrice = useMemo(() => 
    product.variants?.[0]?.price || product.price,
    [product.variants, product.price]
  )
  
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
  
  console.log('ProductCard:', product.name, 'AllMedias:', allMedias, 'DisplayImage:', displayImage, 'IsVideo:', isVideo(displayImage))
  
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
              onError={(e) => console.error('Erreur vidéo:', displayImage, e)}
              onLoadStart={() => console.log('Chargement vidéo:', displayImage)}
            />
          ) : (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => console.error('Erreur image:', displayImage, e)}
              onLoad={() => console.log('Image chargée:', displayImage)}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🎁
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
              {product.variants.length} options disponibles
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

const ProductPreview = React.memo(({ product, onClose, categories, farms }) => {
  const [selectedVariant, setSelectedVariant] = useState(0)
  
  // Convertir prices en variants si nécessaire
  const variants = useMemo(() => {
    let variants = product.variants || [];
    
    // Si pas de variants, essayer de convertir depuis prices
    if (!Array.isArray(variants) || variants.length === 0) {
      if (product.prices && typeof product.prices === 'object') {
        variants = Object.entries(product.prices).map(([name, price]) => ({
          name,
          price: typeof price === 'number' ? `${price}€` : price.toString()
        }));
      } else if (product.price) {
        variants = [{ name: 'Standard', price: product.price }];
      }
    }
    return variants
  }, [product.variants, product.prices, product.price])
  
  const currentVariant = useMemo(() => 
    variants[selectedVariant] || variants[0] || { name: 'Standard', price: product?.price || 'N/A' },
    [variants, selectedVariant, product.price]
  )
  
  // Trouver les noms de catégorie et farm (convertir en string pour la comparaison)
  const categoryName = useMemo(() => 
    categories?.find(c => String(c.id) === String(product.category))?.name || product.category,
    [categories, product.category]
  )
  const farmName = useMemo(() => 
    farms?.find(f => String(f.id) === String(product.farm))?.name || product.farm,
    [farms, product.farm]
  )
  
  // Afficher la photo en priorité dans l'aperçu
  const displayMedia = useMemo(() => 
    product.photo || product.image || product.video,
    [product.photo, product.image, product.video]
  )
  
  // Fonction pour détecter si c'est une vidéo
  const isVideo = useCallback((url) => {
    if (!url) return false
    const videoExtensions = ['.mp4', '.webm', '.mov', '.MOV', '.avi', '.mkv']
    return videoExtensions.some(ext => url.toLowerCase().includes(ext)) || url.startsWith('data:video')
  }, [])
  
  // Fonction pour détecter si c'est un iframe Cloudflare Stream
  const isCloudflareStreamIframe = useCallback((url) => {
    if (!url) return false
    return url.includes('cloudflarestream.com') && url.includes('iframe')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="neon-border rounded-2xl p-0 bg-slate-900 max-w-4xl w-full max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[95vh]">
          {/* Média */}
          <div className="relative h-[250px] sm:h-[300px] md:h-full bg-slate-800">
            {displayMedia ? (
              isCloudflareStreamIframe(displayMedia) ? (
                <iframe
                  src={displayMedia}
                  className="w-full h-full"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              ) : isVideo(displayMedia) ? (
                <video
                  src={displayMedia}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                  onError={(e) => console.error('Erreur vidéo preview:', displayMedia, e)}
                  onLoadStart={() => console.log('Chargement vidéo preview:', displayMedia)}
                />
              ) : (
                <img
                  src={displayMedia}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => console.error('Erreur image preview:', displayMedia, e)}
                  onLoad={() => console.log('Image preview chargée:', displayMedia)}
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl sm:text-9xl">
                🎁
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-250px)] sm:max-h-[calc(95vh-300px)] md:max-h-[500px]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-theme-heading mb-2">{product.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {categoryName && (
                    <span className="inline-block px-2 sm:px-3 py-1 bg-gray-700/30 border border-gray-600/50 rounded-full text-gray-300 text-xs sm:text-sm">
                      🏷️ {categoryName}
                    </span>
                  )}
                  {farmName && (
                    <span className="inline-block px-2 sm:px-3 py-1 bg-gray-700/30 border border-gray-600/50 rounded-full text-gray-300 text-xs sm:text-sm">
                      🌾 {farmName}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-xl sm:text-2xl flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <p className="text-theme leading-relaxed text-sm sm:text-base">{product.description}</p>

            {/* Variantes */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-theme-heading">💰 Options</h3>
              <div className="grid grid-cols-2 gap-2">
                {Array.isArray(variants) && variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center ${
                      selectedVariant === index
                        ? 'border-white bg-white/10 text-white'
                        : 'border-gray-700/30 bg-slate-800/50 text-gray-300 hover:border-white/50'
                    }`}
                  >
                    <span className="font-semibold text-xs">{variant.name}</span>
                    <span className="text-sm font-bold text-theme-accent">{variant?.price || 'N/A'}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link to={`/products/${product.id}`}>
              <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-white to-gray-200 rounded-lg text-black font-bold text-base sm:text-lg hover:from-gray-200 hover:to-gray-400 transition-all">
                Voir détails complets
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

export default Products
