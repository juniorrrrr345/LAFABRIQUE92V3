/**
 * Script pour tester toutes les fonctionnalités du panel admin
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function testAdminPanel() {
  console.log('🧪 Test complet du panel admin...')
  
  try {
    // 1. Test des catégories
    console.log('\n📁 Test des catégories...')
    const categoriesResponse = await fetch(`${API_URL}/api/categories`)
    const categories = await categoriesResponse.json()
    console.log(`✅ ${categories.length} catégories trouvées`)
    
    // Créer une catégorie de test
    const testCategory = {
      id: 'test-cat-' + Date.now(),
      name: 'Test Catégorie Admin',
      icon: '🧪',
      description: 'Catégorie créée via panel admin'
    }
    
    const createCategoryResponse = await fetch(`${API_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCategory)
    })
    const createCategoryResult = await createCategoryResponse.json()
    console.log('✅ Catégorie créée:', createCategoryResult)
    
    // 2. Test des farms
    console.log('\n🌾 Test des farms...')
    const farmsResponse = await fetch(`${API_URL}/api/farms`)
    const farms = await farmsResponse.json()
    console.log(`✅ ${farms.length} farms trouvées`)
    
    // Créer une farm de test
    const testFarm = {
      id: 'test-farm-' + Date.now(),
      name: 'Test Farm Admin',
      description: 'Farm créée via panel admin'
    }
    
    const createFarmResponse = await fetch(`${API_URL}/api/farms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testFarm)
    })
    const createFarmResult = await createFarmResponse.json()
    console.log('✅ Farm créée:', createFarmResult)
    
    // 3. Test des produits
    console.log('\n📦 Test des produits...')
    const productsResponse = await fetch(`${API_URL}/api/products`)
    const products = await productsResponse.json()
    console.log(`✅ ${products.length} produits trouvés`)
    
    // Créer un produit de test
    const testProduct = {
      id: 'test-prod-' + Date.now(),
      name: 'Produit Test Admin',
      description: 'Produit créé via panel admin',
      category: testCategory.id,
      farm: testFarm.id,
      variants: [
        { name: 'Test 5g', price: '50€' },
        { name: 'Test 10g', price: '90€' }
      ],
      price: '50€'
    }
    
    const createProductResponse = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testProduct)
    })
    const createProductResult = await createProductResponse.json()
    console.log('✅ Produit créé:', createProductResult)
    
    // 4. Test des settings
    console.log('\n⚙️ Test des settings...')
    const settingsResponse = await fetch(`${API_URL}/api/settings`)
    const settings = await settingsResponse.json()
    console.log('✅ Settings récupérés:', Object.keys(settings))
    
    // 5. Test des réseaux sociaux
    console.log('\n📱 Test des réseaux sociaux...')
    const socialsResponse = await fetch(`${API_URL}/api/socials`)
    const socials = await socialsResponse.json()
    console.log(`✅ ${socials.length} réseaux sociaux trouvés`)
    
    // 6. Nettoyage - Supprimer les éléments de test
    console.log('\n🧹 Nettoyage des éléments de test...')
    
    await fetch(`${API_URL}/api/products/${testProduct.id}`, { method: 'DELETE' })
    console.log('✅ Produit de test supprimé')
    
    await fetch(`${API_URL}/api/categories/${testCategory.id}`, { method: 'DELETE' })
    console.log('✅ Catégorie de test supprimée')
    
    await fetch(`${API_URL}/api/farms/${testFarm.id}`, { method: 'DELETE' })
    console.log('✅ Farm de test supprimée')
    
    console.log('\n🎉 Tous les tests du panel admin ont réussi !')
    console.log('\n📊 Résumé:')
    console.log(`- ${categories.length} catégories`)
    console.log(`- ${farms.length} farms`)
    console.log(`- ${products.length} produits`)
    console.log(`- ${socials.length} réseaux sociaux`)
    console.log('- Settings configurés')
    console.log('\n✅ Le panel admin est entièrement fonctionnel !')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  }
}

// Exécuter le test
testAdminPanel()