import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAll, save, remove } from '../../utils/api'
import { uploadToR2 } from '../../utils/cloudflare'

const AdminFarms = () => {
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFarm, setEditingFarm] = useState(null)

  useEffect(() => {
    fetchFarms()
  }, [])

  const fetchFarms = async () => {
    try {
      const data = await getAll('farms')
      setFarms(data)
    } catch (error) {
      console.error('Error fetching farms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette farm ?')) return

    try {
      await remove('farms', id)
      fetchFarms()
    } catch (error) {
      console.error('Error deleting farm:', error)
    }
  }

  const handleEdit = (farm) => {
    setEditingFarm(farm)
    setShowModal(true)
  }

  const handleAdd = () => {
    setEditingFarm(null)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gradient glow-effect mb-2">
            Gestion des Farms
          </h1>
          <p className="text-gray-400">{farms.length} farm(s) au total</p>
        </div>
        <button
          onClick={handleAdd}
          className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-white to-gray-200 rounded-lg text-black font-semibold hover:from-gray-200 hover:to-gray-400 transition-all flex items-center justify-center space-x-2"
        >
          <span>➕</span>
          <span>Ajouter une farm</span>
        </button>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {farms.map((farm) => (
          <motion.div
            key={farm.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="neon-border rounded-2xl p-6 bg-slate-900/50 backdrop-blur-sm"
          >
            {farm.image && farm.image.startsWith('http') ? (
              <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-slate-800">
                <img src={farm.image} alt={farm.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="text-5xl mb-4 text-center">🌾</div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{farm.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{farm.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(farm)}
                className="flex-1 px-3 py-2 bg-gray-700/20 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-600/30 transition-colors text-sm"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => handleDelete(farm.id)}
                className="flex-1 px-3 py-2 bg-gray-800/20 border border-gray-600/50 rounded-lg text-gray-400 hover:bg-gray-700/30 transition-colors text-sm"
              >
                🗑️ Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <FarmModal
            farm={editingFarm}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false)
              fetchFarms()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const FarmModal = ({ farm, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: farm?.name || ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const farmData = {
        id: farm?.id || Date.now().toString(),
        ...formData,
        updatedAt: new Date().toISOString()
      }

      if (!farm) {
        farmData.createdAt = new Date().toISOString()
      }

      await save('farms', farmData)
      onSuccess()
    } catch (error) {
      console.error('Error saving farm:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div className="w-full max-w-sm mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="neon-border rounded-2xl p-6 bg-slate-900 w-full"
          onClick={(e) => e.stopPropagation()}
        >
        <h2 className="text-2xl font-bold text-white mb-6">
          {farm ? '✏️ Modifier la farm' : '➕ Ajouter une farm'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Nom de la farm</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Ex: Farm du Nord"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              placeholder="Description de la farm..."
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Image</label>
            {formData.image && formData.image.startsWith('http') ? (
              <div className="mb-3 relative group">
                <img src={formData.image} alt="Aperçu" className="w-full h-40 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              disabled={uploadingImage}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-700 file:text-white file:text-xs file:cursor-pointer"
            />
            {uploadingImage && <p className="text-gray-400 text-sm mt-2">Upload en cours...</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="flex-1 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-semibold hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdminFarms
