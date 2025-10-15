/**
 * Script pour déboguer l'API des produits
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function debugAPI() {
  console.log('🔍 Débogage de l\'API...')
  
  try {
    // 1. Tester la récupération des produits
    console.log('\n1. Récupération des produits...')
    const productsResponse = await fetch(`${API_URL}/api/products`)
    console.log('Status:', productsResponse.status)
    console.log('Headers:', Object.fromEntries(productsResponse.headers.entries()))
    
    const productsText = await productsResponse.text()
    console.log('Response length:', productsText.length)
    console.log('First 200 chars:', productsText.substring(0, 200))
    
    if (productsResponse.ok) {
      const products = JSON.parse(productsText)
      console.log('✅ Produits récupérés:', products.length)
    } else {
      console.log('❌ Erreur HTTP:', productsResponse.status)
    }
    
    // 2. Tester la création d'un produit simple
    console.log('\n2. Création d\'un produit simple...')
    const simpleProduct = {
      name: 'Test Simple',
      description: 'Test',
      category: '1',
      farm: '1',
      price: '10€'
    }
    
    const createResponse = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(simpleProduct)
    })
    
    console.log('Create Status:', createResponse.status)
    const createText = await createResponse.text()
    console.log('Create Response:', createText)
    
    if (createResponse.ok) {
      const createResult = JSON.parse(createText)
      console.log('✅ Produit créé:', createResult)
    } else {
      console.log('❌ Erreur création:', createText)
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

// Exécuter le debug
debugAPI()