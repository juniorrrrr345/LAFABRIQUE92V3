import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAll, remove } from '../../utils/api'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await getAll('orders')
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) return

    try {
      await remove('orders', id)
      fetchOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gradient glow-effect mb-2">
            Gestion des Commandes
          </h1>
          <p className="text-gray-400">{orders.length} commande(s) au total</p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neon-border rounded-2xl p-6 bg-slate-900/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      Commande #{order.id}
                    </h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      {order.status || 'En attente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">Client:</span> {order.customerName || 'Non renseigné'}
                    </div>
                    <div>
                      <span className="text-gray-400">Email:</span> {order.customerEmail || 'Non renseigné'}
                    </div>
                    <div>
                      <span className="text-gray-400">Téléphone:</span> {order.customerPhone || 'Non renseigné'}
                    </div>
                    <div>
                      <span className="text-gray-400">Date:</span> {formatDate(order.createdAt)}
                    </div>
                    <div>
                      <span className="text-gray-400">Total:</span> {order.total || 'N/A'}€
                    </div>
                    <div>
                      <span className="text-gray-400">Produits:</span> {order.items?.length || 0}
                    </div>
                  </div>

                  {order.message && (
                    <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-gray-400 text-sm">Message:</span>
                      <p className="text-white text-sm mt-1">{order.message}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
                  >
                    👁️ Voir
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const OrderDetailModal = ({ order, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="neon-border rounded-2xl p-8 bg-slate-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gradient">
            Commande #{order.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Informations client */}
          <div className="border border-gray-700 rounded-xl p-6 bg-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">👤 Informations Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">Nom:</span>
                <p className="text-white">{order.customerName || 'Non renseigné'}</p>
              </div>
              <div>
                <span className="text-gray-400">Email:</span>
                <p className="text-white">{order.customerEmail || 'Non renseigné'}</p>
              </div>
              <div>
                <span className="text-gray-400">Téléphone:</span>
                <p className="text-white">{order.customerPhone || 'Non renseigné'}</p>
              </div>
              <div>
                <span className="text-gray-400">Date de commande:</span>
                <p className="text-white">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>

          {/* Produits commandés */}
          {order.items && order.items.length > 0 && (
            <div className="border border-gray-700 rounded-xl p-6 bg-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-4">🛒 Produits Commandés</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div>
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{item.price}€</p>
                      <p className="text-gray-400 text-sm">Total: {item.total}€</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-gradient">{order.total}€</span>
                </div>
              </div>
            </div>
          )}

          {/* Message */}
          {order.message && (
            <div className="border border-gray-700 rounded-xl p-6 bg-slate-800/50">
              <h3 className="text-xl font-bold text-white mb-4">💬 Message</h3>
              <p className="text-gray-300">{order.message}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AdminOrders