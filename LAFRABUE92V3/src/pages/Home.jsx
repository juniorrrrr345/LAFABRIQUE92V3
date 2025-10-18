import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState('')

  useEffect(() => {
    const loadBackground = async () => {
      try {
        const { getById } = await import('../utils/api')
        const data = await getById('settings', 'general')
        
        if (data && data.backgroundImage) {
          setBackgroundImage(data.backgroundImage)
        }
      } catch (error) {
        console.error('Error loading background:', error)
      }
    }
    
    loadBackground()
  }, [])

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Hero />
      <Footer />
    </div>
  )
}

export default Home
