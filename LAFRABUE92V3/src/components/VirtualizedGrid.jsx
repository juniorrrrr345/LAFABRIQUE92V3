import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

const VirtualizedGrid = ({ 
  items, 
  renderItem, 
  columns = 4, 
  itemHeight = 300,
  containerHeight = 600,
  gap = 16 
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [containerRef, setContainerRef] = useState(null)

  const itemsPerRow = columns
  const rowHeight = itemHeight + gap
  const totalRows = Math.ceil(items.length / itemsPerRow)
  const containerWidth = containerRef?.clientWidth || 800

  const visibleRows = Math.ceil(containerHeight / rowHeight) + 2 // +2 pour le buffer
  const startRow = Math.floor(scrollTop / rowHeight)
  const endRow = Math.min(startRow + visibleRows, totalRows)

  const visibleItems = useMemo(() => {
    const visible = []
    for (let row = startRow; row < endRow; row++) {
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col
        if (index < items.length) {
          visible.push({
            item: items[index],
            index,
            row,
            col
          })
        }
      }
    }
    return visible
  }, [items, startRow, endRow, itemsPerRow])

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  const totalHeight = totalRows * rowHeight

  return (
    <div
      ref={setContainerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, row, col }) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              position: 'absolute',
              top: row * rowHeight,
              left: col * (containerWidth / itemsPerRow),
              width: containerWidth / itemsPerRow - gap,
              height: itemHeight
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default VirtualizedGrid