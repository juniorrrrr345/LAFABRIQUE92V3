import React, { useState } from 'react'

const ConnectionTest = () => {
  const [testing, setTesting] = useState(false)
  const [results, setResults] = useState(null)

  const testConnection = async () => {
    setTesting(true)
    setResults(null)

    const tests = [
      { name: 'API Categories', url: 'https://calitekv3.calitek-junior.workers.dev/api/categories' },
      { name: 'API Farms', url: 'https://calitekv3.calitek-junior.workers.dev/api/farms' },
      { name: 'API Products', url: 'https://calitekv3.calitek-junior.workers.dev/api/products' }
    ]

    const results = []

    for (const test of tests) {
      try {
        const startTime = Date.now()
        const response = await fetch(test.url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit'
        })
        const endTime = Date.now()
        
        results.push({
          name: test.name,
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          responseTime: endTime - startTime,
          error: response.ok ? null : `HTTP ${response.status}`
        })
      } catch (error) {
        results.push({
          name: test.name,
          status: 'error',
          statusCode: 0,
          responseTime: 0,
          error: error.message
        })
      }
    }

    setResults(results)
    setTesting(false)
  }

  return (
    <div className="neon-border rounded-xl p-6 bg-slate-900/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-4">🔧 Test de Connexion</h3>
      
      <button
        onClick={testConnection}
        disabled={testing}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
      >
        {testing ? 'Test en cours...' : 'Tester la connexion'}
      </button>

      {results && (
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded">
              <span className="text-white">{result.name}</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${result.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {result.status === 'success' ? '✅' : '❌'}
                </span>
                <span className="text-sm text-gray-300">
                  {result.status === 'success' ? `${result.responseTime}ms` : result.error}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-slate-800/30 rounded text-sm text-gray-300">
        <div><strong>URL API:</strong> https://calitekv3.calitek-junior.workers.dev</div>
        <div><strong>Mode:</strong> CORS</div>
      </div>
    </div>
  )
}

export default ConnectionTest