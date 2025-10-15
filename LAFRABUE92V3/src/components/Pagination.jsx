import React, { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import OptimizedButton from './OptimizedButton'

const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 5 
}) => {
  const pages = useMemo(() => {
    const pages = []
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const end = Math.min(totalPages, start + maxVisiblePages - 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }, [currentPage, totalPages, maxVisiblePages])

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Bouton Précédent */}
      <OptimizedButton
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2"
      >
        ← Précédent
      </OptimizedButton>

      {/* Pages */}
      {pages.map(page => (
        <motion.div
          key={page}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <OptimizedButton
            variant={page === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onPageChange(page)}
            className="px-3 py-2 min-w-[40px]"
          >
            {page}
          </OptimizedButton>
        </motion.div>
      ))}

      {/* Bouton Suivant */}
      <OptimizedButton
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2"
      >
        Suivant →
      </OptimizedButton>
    </div>
  )
})

Pagination.displayName = 'Pagination'

export default Pagination