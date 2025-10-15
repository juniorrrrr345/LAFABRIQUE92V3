#!/usr/bin/env node

/**
 * Script pour corriger le worker en forçant la mise à jour du schéma
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

async function fixWorker() {
  console.log('🔧 Correction du worker...\n');

  try {
    // 1. Réinitialiser la base de données
    console.log('1️⃣ Réinitialisation de la base de données...');
    const initResult = await makeRequest('/api/init');
    console.log(`   Status: ${initResult.status}`);
    console.log(`   Response:`, initResult.data);
    console.log('');

    // 2. Tester la création d'une farm simple
    console.log('2️⃣ Test de création d\'une farm simple...');
    const createFarmResult = await makeRequest('/api/farms', 'POST', { 
      name: 'Farm Test',
      id: 'test-' + Date.now()
    });
    console.log(`   Status: ${createFarmResult.status}`);
    console.log(`   Response:`, createFarmResult.data);
    console.log('');

    // 3. Vérifier que la farm a été créée
    console.log('3️⃣ Vérification des farms...');
    const farmsResult = await makeRequest('/api/farms');
    console.log(`   Status: ${farmsResult.status}`);
    console.log(`   Response:`, farmsResult.data);
    console.log('');

    if (createFarmResult.status === 200) {
      console.log('✅ Worker corrigé avec succès !');
    } else {
      console.log('❌ Le worker a encore des problèmes.');
    }

  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message);
  }
}

fixWorker();