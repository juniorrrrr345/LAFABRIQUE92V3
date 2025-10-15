/**
 * Script pour migrer les données existantes vers la base de données D1
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function migrateToD1() {
  console.log('🔄 Migration des données vers D1...')
  
  try {
    // 1. Récupérer toutes les données existantes
    console.log('\n1. Récupération des données existantes...')
    
    const [categoriesResponse, farmsResponse, productsResponse, socialsResponse, settingsResponse] = await Promise.all([
      fetch(`${API_URL}/api/categories`),
      fetch(`${API_URL}/api/farms`),
      fetch(`${API_URL}/api/products`),
      fetch(`${API_URL}/api/socials`),
      fetch(`${API_URL}/api/settings`)
    ])
    
    const categories = await categoriesResponse.json()
    const farms = await farmsResponse.json()
    const products = await productsResponse.json()
    const socials = await socialsResponse.json()
    const settings = await settingsResponse.json()
    
    console.log(`✅ ${categories.length} catégories récupérées`)
    console.log(`✅ ${farms.length} farms récupérées`)
    console.log(`✅ ${products.length} produits récupérés`)
    console.log(`✅ ${socials.length} réseaux sociaux récupérés`)
    console.log(`✅ ${Object.keys(settings).length} settings récupérés`)
    
    // 2. Générer les requêtes SQL d'insertion
    console.log('\n2. Génération des requêtes SQL...')
    
    let sqlQueries = []
    
    // Catégories
    categories.forEach(cat => {
      sqlQueries.push(`INSERT OR REPLACE INTO categories (id, name, icon, description, createdAt) VALUES ('${cat.id}', '${cat.name.replace(/'/g, "''")}', '${cat.icon || ''}', '${(cat.description || '').replace(/'/g, "''")}', '${cat.createdAt || new Date().toISOString()}');`)
    })
    
    // Farms
    farms.forEach(farm => {
      sqlQueries.push(`INSERT OR REPLACE INTO farms (id, name, image, description, createdAt) VALUES ('${farm.id}', '${farm.name.replace(/'/g, "''")}', '${farm.image || ''}', '${(farm.description || '').replace(/'/g, "''")}', '${farm.createdAt || new Date().toISOString()}');`)
    })
    
    // Produits
    products.forEach(product => {
      const medias = JSON.stringify(product.medias || [])
      const variants = JSON.stringify(product.variants || [])
      sqlQueries.push(`INSERT OR REPLACE INTO products (id, name, description, category, farm, photo, video, image, medias, variants, price, createdAt, updatedAt) VALUES ('${product.id}', '${product.name.replace(/'/g, "''")}', '${(product.description || '').replace(/'/g, "''")}', '${product.category || ''}', '${product.farm || ''}', '${product.photo || ''}', '${product.video || ''}', '${product.image || ''}', '${medias.replace(/'/g, "''")}', '${variants.replace(/'/g, "''")}', '${product.price || ''}', '${product.createdAt || new Date().toISOString()}', '${product.updatedAt || new Date().toISOString()}');`)
    })
    
    // Réseaux sociaux
    socials.forEach(social => {
      sqlQueries.push(`INSERT OR REPLACE INTO socials (id, name, icon, description, url, createdAt) VALUES ('${social.id}', '${social.name.replace(/'/g, "''")}', '${social.icon || ''}', '${(social.description || '').replace(/'/g, "''")}', '${social.url || ''}', '${social.createdAt || new Date().toISOString()}');`)
    })
    
    // Settings
    Object.entries(settings).forEach(([key, value]) => {
      const valueStr = typeof value === 'string' ? value : JSON.stringify(value)
      sqlQueries.push(`INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES ('${key}', '${valueStr.replace(/'/g, "''")}', '${new Date().toISOString()}');`)
    })
    
    // 3. Sauvegarder les requêtes dans un fichier
    console.log('\n3. Sauvegarde des requêtes SQL...')
    
    const sqlContent = `-- Requêtes SQL pour migrer les données vers D1
-- À exécuter dans la console D1 de Cloudflare

${sqlQueries.join('\n')}

-- Vérifier les données
SELECT 'Catégories:' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Farms:', COUNT(*) FROM farms
UNION ALL
SELECT 'Produits:', COUNT(*) FROM products
UNION ALL
SELECT 'Réseaux sociaux:', COUNT(*) FROM socials
UNION ALL
SELECT 'Settings:', COUNT(*) FROM settings;
`
    
    const fs = await import('fs')
    fs.writeFileSync('/workspace/LAFRABUE92V3/migrate-data.sql', sqlContent)
    console.log('✅ Fichier migrate-data.sql créé')
    
    console.log('\n📋 Instructions:')
    console.log('1. Exécutez d\'abord init-d1-database.sql dans la console D1')
    console.log('2. Puis exécutez migrate-data.sql dans la console D1')
    console.log('3. Vérifiez que toutes les données sont bien migrées')
    
    console.log('\n🎉 Migration préparée avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  }
}

// Exécuter la migration
migrateToD1()