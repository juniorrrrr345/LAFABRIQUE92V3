import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{
      background: '#343a40',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            LAFRABUE92V3
          </Link>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Accueil
            </Link>
            <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>
              Produits
            </Link>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header