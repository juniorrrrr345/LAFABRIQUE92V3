#!/usr/bin/env node

/**
 * Script pour corriger la base de données en forçant la réinitialisation
 */

import https from 'https';

const API_URL = 'https://lafrabue92v3.calitek-junior.workers.dev';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'lafrabue92v3.calitek-junior.workers.dev',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: jsonBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function fixDatabase() {
  console.log('🔧 Correction de la base de données...\n');

  try {
    // 1. Réinitialiser la base de données plusieurs fois
    console.log('1️⃣ Réinitialisation de la base de données...');
    for (let i = 0; i < 3; i++) {
      const initResult = await makeRequest('/api/init');
      console.log(`   Tentative ${i + 1}: Status ${initResult.status}`);
      if (initResult.status === 200) {
        console.log('   ✅ Base de données réinitialisée');
        break;
      }
    }
    console.log('');

    // 2. Attendre un peu
    console.log('2️⃣ Attente de 2 secondes...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('');

    // 3. Tester la création d'une farm avec différents formats
    console.log('3️⃣ Test de création d\'une farm...');
    
    const testData = [
      { name: 'Farm Test 1', id: 'test1' },
      { name: 'Farm Test 2' },
      { name: 'Farm Test 3', id: 'test3', description: 'Test description' }
    ];

    for (const data of testData) {
      console.log(`   Test avec: ${JSON.stringify(data)}`);
      const result = await makeRequest('/api/farms', 'POST', data);
      console.log(`   Status: ${result.status}, Response: ${JSON.stringify(result.data)}`);
      
      if (result.status === 200) {
        console.log('   ✅ Farm créée avec succès !');
        break;
      }
      
      // Attendre entre les tentatives
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('');

    // 4. Vérifier les farms
    console.log('4️⃣ Vérification des farms...');
    const farmsResult = await makeRequest('/api/farms');
    console.log(`   Status: ${farmsResult.status}`);
    console.log(`   Farms: ${JSON.stringify(farmsResult.data)}`);
    console.log('');

    // 5. Tester les produits
    console.log('5️⃣ Test des produits...');
    const productsResult = await makeRequest('/api/products');
    console.log(`   Status: ${productsResult.status}`);
    console.log(`   Response: ${JSON.stringify(productsResult.data)}`);

  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message);
  }
}

fixDatabase();