import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="neon-border rounded-xl p-8 bg-slate-900 max-w-md w-full text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Erreur de l'application</h2>
            <p className="text-gray-300 mb-6">
              Une erreur s'est produite. Veuillez recharger la page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary