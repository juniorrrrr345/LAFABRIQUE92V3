import React, { useState, useEffect } from 'react'
import { getAll } from '../../utils/api'

const APIDiagnostic = () => {
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAPIStatus()
  }, [])

  const checkAPIStatus = async () => {
    const endpoints = ['categories', 'farms', 'products', 'socials', 'settings']
    const newStatus = {}

    for (const endpoint of endpoints) {
      try {
        const startTime = Date.now()
        const data = await getAll(endpoint)
        const endTime = Date.now()
        
        newStatus[endpoint] = {
          status: 'success',
          count: Array.isArray(data) ? data.length : 'objet',
          responseTime: endTime - startTime
        }
      } catch (error) {
        newStatus[endpoint] = {
          status: 'error',
          error: error.message
        }
      }
    }

    setStatus(newStatus)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="neon-border rounded-xl p-6 bg-slate-900/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">🔍 Diagnostic API</h3>
        <div className="animate-pulse text-gray-400">Vérification en cours...</div>
      </div>
    )
  }

  return (
    <div className="neon-border rounded-xl p-6 bg-slate-900/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">🔍 Diagnostic API</h3>
        <button
          onClick={checkAPIStatus}
          className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600"
        >
          Actualiser
        </button>
      </div>
      
      <div className="space-y-3">
        {Object.entries(status).map(([endpoint, info]) => (
          <div key={endpoint} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">
                {info.status === 'success' ? '✅' : '❌'}
              </span>
              <span className="text-white font-medium capitalize">{endpoint}</span>
            </div>
            <div className="text-right">
              {info.status === 'success' ? (
                <div className="text-sm text-gray-300">
                  <div>{info.count} éléments</div>
                  <div className="text-xs text-gray-400">{info.responseTime}ms</div>
                </div>
              ) : (
                <div className="text-sm text-red-400">
                  <div>Erreur</div>
                  <div className="text-xs">{info.error}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
        <div className="text-sm text-gray-300">
          <div><strong>URL API:</strong> {import.meta.env.VITE_API_URL || 'https://calitekv3.calitek-junior.workers.dev'}</div>
          <div><strong>Timestamp:</strong> {new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

export default APIDiagnostic