/**
 * Script pour tester l'API des settings de commande
 */

const API_URL = 'https://calitekv3.calitek-junior.workers.dev'

async function testOrderSettings() {
  console.log('🧪 Test des paramètres de commande...')
  
  try {
    // 1. Tester la récupération des settings
    console.log('\n1. Récupération des settings...')
    const getResponse = await fetch(`${API_URL}/api/settings`)
    const settings = await getResponse.json()
    console.log('Settings récupérés:', JSON.stringify(settings, null, 2))
    
    // 2. Tester la sauvegarde des paramètres de commande
    console.log('\n2. Sauvegarde des paramètres de commande...')
    const orderSettings = {
      key: 'orderSettings',
      orderLink: 'https://wa.me/33123456789',
      orderButtonText: 'Commander'
    }
    
    const saveResponse = await fetch(`${API_URL}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderSettings)
    })
    
    const saveResult = await saveResponse.json()
    console.log('Résultat de la sauvegarde:', saveResult)
    
    // 3. Vérifier que les paramètres ont été sauvegardés
    console.log('\n3. Vérification de la sauvegarde...')
    const verifyResponse = await fetch(`${API_URL}/api/settings`)
    const verifySettings = await verifyResponse.json()
    console.log('Settings après sauvegarde:', JSON.stringify(verifySettings, null, 2))
    
    // 4. Tester la récupération d'un setting spécifique
    console.log('\n4. Récupération du setting orderSettings...')
    const specificResponse = await fetch(`${API_URL}/api/settings/orderSettings`)
    const specificSetting = await specificResponse.json()
    console.log('Setting orderSettings:', specificSetting)
    
    console.log('\n✅ Test terminé avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  }
}

// Exécuter le test
testOrderSettings()