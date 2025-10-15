#!/usr/bin/env node

/**
 * Script de test de l'API Cloudflare Worker
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

async function testAPI() {
  console.log('🧪 Test de l\'API Cloudflare Worker...\n');

  try {
    // Test 1: Init database
    console.log('1️⃣ Test de l\'initialisation de la base de données...');
    const initResult = await makeRequest('/api/init');
    console.log(`   Status: ${initResult.status}`);
    console.log(`   Response:`, initResult.data);
    console.log('');

    // Test 2: Get products
    console.log('2️⃣ Test de récupération des produits...');
    const productsResult = await makeRequest('/api/products');
    console.log(`   Status: ${productsResult.status}`);
    console.log(`   Response:`, productsResult.data);
    console.log('');

    // Test 3: Get farms
    console.log('3️⃣ Test de récupération des farms...');
    const farmsResult = await makeRequest('/api/farms');
    console.log(`   Status: ${farmsResult.status}`);
    console.log(`   Response:`, farmsResult.data);
    console.log('');

    // Test 4: Create farm
    console.log('4️⃣ Test de création d\'une farm...');
    const createFarmResult = await makeRequest('/api/farms', 'POST', { name: 'Test Farm' });
    console.log(`   Status: ${createFarmResult.status}`);
    console.log(`   Response:`, createFarmResult.data);
    console.log('');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

testAPI();