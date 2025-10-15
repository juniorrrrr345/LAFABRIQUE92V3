import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAll, save } from '../../utils/api'

const AdminOrderSettings = () => {
  const [settings, setSettings] = useState({
    orderLink: '',
    orderButtonText: 'Commander'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await getAll('settings')
      console.log('Settings chargés:', data)
      
      // Les settings sont maintenant un objet, pas un tableau
      if (data.orderSettings) {
        console.log('Order settings trouvés:', data.orderSettings)
        setSettings({
          orderLink: data.orderSettings.orderLink || '',
          orderButtonText: data.orderSettings.orderButtonText || 'Commander'
        })
      } else {
        // Si pas de settings trouvés, essayer de charger directement
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://calitekv3.calitek-junior.workers.dev'}/api/settings/orderSettings`)
          if (response.ok) {
            const directSettings = await response.json()
            console.log('Settings directs:', directSettings)
            setSettings({
              orderLink: directSettings.orderLink || '',
              orderButtonText: directSettings.orderButtonText || 'Commander'
            })
          }
        } catch (directError) {
          console.log('Pas de settings directs trouvés')
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      console.log('Sauvegarde des paramètres:', settings)
      
      const API_URL = import.meta.env.VITE_API_URL || 'https://calitekv3.calitek-junior.workers.dev'
      
      // Essayer directement avec fetch
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'orderSettings',
          orderLink: settings.orderLink,
          orderButtonText: settings.orderButtonText
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('Résultat de la sauvegarde:', result)
      
      alert('✅ Paramètres de commande enregistrés avec succès !')
      
      // Recharger les paramètres pour vérifier
      await loadSettings()
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('❌ Erreur lors de la sauvegarde: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient glow-effect mb-2">
          Paramètres de Commande
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Configurez le lien et le texte du bouton de commande
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Lien de commande */}
        <div className="border border-gray-700 rounded-xl p-6 bg-slate-900/50">
          <h3 className="text-xl font-bold text-white mb-4">🔗 Lien de Commande</h3>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">
              Lien externe (WhatsApp, Telegram, formulaire, etc.)
            </label>
            <input
              type="url"
              value={settings.orderLink}
              onChange={(e) => setSettings({ ...settings, orderLink: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="https://wa.me/123456789"
            />
            <p className="text-gray-500 text-xs mt-2">
              Exemple WhatsApp : https://wa.me/33123456789<br/>
              Exemple Telegram : https://t.me/username
            </p>
          </div>
        </div>

        {/* Texte du bouton */}
        <div className="border border-gray-700 rounded-xl p-6 bg-slate-900/50">
          <h3 className="text-xl font-bold text-white mb-4">💬 Texte du Bouton</h3>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">
              Texte affiché sur le bouton de commande
            </label>
            <input
              type="text"
              value={settings.orderButtonText}
              onChange={(e) => setSettings({ ...settings, orderButtonText: e.target.value })}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500 transition-colors"
              placeholder="Commander"
              maxLength="30"
            />
            <p className="text-gray-500 text-xs mt-2">
              Maximum 30 caractères
            </p>
          </div>
        </div>

        {/* Aperçu */}
        <div className="border border-gray-700 rounded-xl p-6 bg-slate-900/50">
          <h3 className="text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
          <div className="flex items-center justify-center py-8">
            <button
              type="button"
              className="px-8 py-4 bg-gradient-to-r from-white to-gray-200 rounded-lg text-black font-bold text-lg hover:from-gray-200 hover:to-gray-400 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>💬</span>
              <span>{settings.orderButtonText || 'Commander'}</span>
            </button>
          </div>
        </div>

        {/* Bouton Sauvegarder */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Enregistrement...' : '💾 Enregistrer'}
          </button>
          <button
            type="button"
            onClick={async () => {
              console.log('Test de l\'API...')
              try {
                const API_URL = import.meta.env.VITE_API_URL || 'https://calitekv3.calitek-junior.workers.dev'
                const response = await fetch(`${API_URL}/api/settings`)
                const data = await response.json()
                console.log('Test API settings:', data)
                alert('Test API: ' + JSON.stringify(data, null, 2))
              } catch (error) {
                console.error('Erreur test API:', error)
                alert('Erreur test API: ' + error.message)
              }
            }}
            className="px-4 py-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-all"
          >
            🧪 Test API
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminOrderSettings
