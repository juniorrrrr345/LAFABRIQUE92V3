/**
 * Script pour tester la création d'un produit
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function testProductCreation() {
  console.log('🧪 Test de création d\'un produit...')
  
  try {
    // 1. Récupérer les catégories et farms existantes
    console.log('\n1. Récupération des catégories et farms...')
    const categoriesResponse = await fetch(`${API_URL}/api/categories`)
    const categories = await categoriesResponse.json()
    console.log('Catégories disponibles:', categories.length)
    
    const farmsResponse = await fetch(`${API_URL}/api/farms`)
    const farms = await farmsResponse.json()
    console.log('Farms disponibles:', farms.length)
    
    // 2. Créer un produit de test
    console.log('\n2. Création d\'un produit de test...')
    const testProduct = {
      id: 'test-product-' + Date.now(),
      name: 'Produit de Test',
      description: 'Description du produit de test',
      category: categories[0]?.id || '1',
      farm: farms[0]?.id || '1',
      photo: '',
      video: '',
      medias: [],
      variants: [
        { name: '5g', price: '80€' },
        { name: '10g', price: '150€' }
      ],
      price: '80€',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const createResponse = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testProduct)
    })
    
    const createResult = await createResponse.json()
    console.log('Résultat de la création:', createResult)
    
    // 3. Vérifier que le produit a été créé
    console.log('\n3. Vérification de la création...')
    const productsResponse = await fetch(`${API_URL}/api/products`)
    const products = await productsResponse.json()
    console.log('Nombre total de produits:', products.length)
    
    const createdProduct = products.find(p => p.id === testProduct.id)
    if (createdProduct) {
      console.log('✅ Produit créé avec succès:', createdProduct.name)
    } else {
      console.log('❌ Produit non trouvé')
    }
    
    // 4. Supprimer le produit de test
    console.log('\n4. Suppression du produit de test...')
    const deleteResponse = await fetch(`${API_URL}/api/products/${testProduct.id}`, {
      method: 'DELETE'
    })
    const deleteResult = await deleteResponse.json()
    console.log('Résultat de la suppression:', deleteResult)
    
    console.log('\n✅ Test de création de produit terminé avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  }
}

// Exécuter le test
testProductCreation()