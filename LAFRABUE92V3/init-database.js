/**
 * Script pour initialiser la base de données et tester les API
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function initDatabase() {
  console.log('🚀 Initialisation de la base de données...')
  
  try {
    // 1. Initialiser la base de données
    const initResponse = await fetch(`${API_URL}/api/init`)
    const initResult = await initResponse.json()
    console.log('✅ Base de données initialisée:', initResult)
    
    // 2. Tester les catégories
    console.log('\n📁 Test des catégories...')
    const categoriesResponse = await fetch(`${API_URL}/api/categories`)
    const categories = await categoriesResponse.json()
    console.log('Catégories existantes:', categories)
    
    // Créer une catégorie de test si elle n'existe pas
    if (categories.length === 0) {
      const testCategory = {
        id: 'test-category-1',
        name: 'Test Catégorie',
        icon: '🎁',
        description: 'Catégorie de test'
      }
      
      const createCategoryResponse = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCategory)
      })
      const createCategoryResult = await createCategoryResponse.json()
      console.log('✅ Catégorie de test créée:', createCategoryResult)
    }
    
    // 3. Tester les farms
    console.log('\n🌾 Test des farms...')
    const farmsResponse = await fetch(`${API_URL}/api/farms`)
    const farms = await farmsResponse.json()
    console.log('Farms existantes:', farms)
    
    // Créer une farm de test si elle n'existe pas
    if (farms.length === 0) {
      const testFarm = {
        id: 'test-farm-1',
        name: 'Test Farm',
        description: 'Farm de test'
      }
      
      const createFarmResponse = await fetch(`${API_URL}/api/farms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testFarm)
      })
      const createFarmResult = await createFarmResponse.json()
      console.log('✅ Farm de test créée:', createFarmResult)
    }
    
    // 4. Tester les produits
    console.log('\n📦 Test des produits...')
    const productsResponse = await fetch(`${API_URL}/api/products`)
    const products = await productsResponse.json()
    console.log('Produits existants:', products.length)
    
    // 5. Tester les settings
    console.log('\n⚙️ Test des settings...')
    const settingsResponse = await fetch(`${API_URL}/api/settings`)
    const settings = await settingsResponse.json()
    console.log('Settings existants:', settings)
    
    // Créer des settings de test
    const testSettings = {
      key: 'orderSettings',
      orderLink: 'https://wa.me/33123456789',
      orderButtonText: 'Commander'
    }
    
    const createSettingsResponse = await fetch(`${API_URL}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testSettings)
    })
    const createSettingsResult = await createSettingsResponse.json()
    console.log('✅ Settings de test créés:', createSettingsResult)
    
    // 6. Tester les réseaux sociaux
    console.log('\n📱 Test des réseaux sociaux...')
    const socialsResponse = await fetch(`${API_URL}/api/socials`)
    const socials = await socialsResponse.json()
    console.log('Réseaux sociaux existants:', socials)
    
    console.log('\n🎉 Initialisation terminée avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error)
  }
}

// Exécuter l'initialisation
initDatabase()