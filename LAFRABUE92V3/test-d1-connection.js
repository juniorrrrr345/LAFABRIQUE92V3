/**
 * Script pour tester la connexion à la base de données D1
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function testD1Connection() {
  console.log('🔍 Test de la connexion à la base de données D1...')
  
  try {
    // 1. Tester l'initialisation de la base de données
    console.log('\n1. Initialisation de la base de données...')
    const initResponse = await fetch(`${API_URL}/api/init`)
    const initResult = await initResponse.json()
    console.log('Résultat init:', initResult)
    
    // 2. Tester la récupération des catégories
    console.log('\n2. Test des catégories...')
    const categoriesResponse = await fetch(`${API_URL}/api/categories`)
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json()
      console.log(`✅ ${categories.length} catégories trouvées`)
    } else {
      console.log('❌ Erreur catégories:', categoriesResponse.status)
    }
    
    // 3. Tester la récupération des farms
    console.log('\n3. Test des farms...')
    const farmsResponse = await fetch(`${API_URL}/api/farms`)
    if (farmsResponse.ok) {
      const farms = await farmsResponse.json()
      console.log(`✅ ${farms.length} farms trouvées`)
    } else {
      console.log('❌ Erreur farms:', farmsResponse.status)
    }
    
    // 4. Tester la récupération des produits
    console.log('\n4. Test des produits...')
    const productsResponse = await fetch(`${API_URL}/api/products`)
    if (productsResponse.ok) {
      const products = await productsResponse.json()
      console.log(`✅ ${products.length} produits trouvés`)
    } else {
      console.log('❌ Erreur produits:', productsResponse.status)
    }
    
    // 5. Tester la récupération des settings
    console.log('\n5. Test des settings...')
    const settingsResponse = await fetch(`${API_URL}/api/settings`)
    if (settingsResponse.ok) {
      const settings = await settingsResponse.json()
      console.log(`✅ ${Object.keys(settings).length} settings trouvés`)
    } else {
      console.log('❌ Erreur settings:', settingsResponse.status)
    }
    
    // 6. Tester la création d'une catégorie
    console.log('\n6. Test de création d\'une catégorie...')
    const testCategory = {
      id: 'test-d1-cat-' + Date.now(),
      name: 'Test D1 Catégorie',
      icon: '🧪',
      description: 'Test de connexion D1'
    }
    
    const createCategoryResponse = await fetch(`${API_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCategory)
    })
    
    if (createCategoryResponse.ok) {
      const createResult = await createCategoryResponse.json()
      console.log('✅ Catégorie créée:', createResult)
      
      // Supprimer la catégorie de test
      const deleteResponse = await fetch(`${API_URL}/api/categories/${testCategory.id}`, {
        method: 'DELETE'
      })
      if (deleteResponse.ok) {
        console.log('✅ Catégorie de test supprimée')
      }
    } else {
      console.log('❌ Erreur création catégorie:', createCategoryResponse.status)
    }
    
    console.log('\n🎉 Test de connexion D1 terminé !')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  }
}

// Exécuter le test
testD1Connection()