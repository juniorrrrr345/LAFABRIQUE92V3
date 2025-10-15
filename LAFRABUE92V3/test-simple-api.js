#!/usr/bin/env node

/**
 * Test simple de l'API pour identifier le problème exact
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
          resolve({ status: res.statusCode, data: jsonBody, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: body, headers: res.headers });
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
  console.log('🧪 Test détaillé de l\'API...\n');

  try {
    // Test 1: Vérifier que l'API répond
    console.log('1️⃣ Test de base...');
    const baseResult = await makeRequest('/api/init');
    console.log(`   Status: ${baseResult.status}`);
    console.log(`   Headers:`, baseResult.headers);
    console.log(`   Response:`, baseResult.data);
    console.log('');

    // Test 2: Tester avec des headers différents
    console.log('2️⃣ Test avec headers différents...');
    const testHeaders = [
      { 'Accept': 'application/json' },
      { 'Accept': '*/*' },
      { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      {}
    ];

    for (let i = 0; i < testHeaders.length; i++) {
      console.log(`   Test ${i + 1} avec headers:`, testHeaders[i]);
      try {
        const result = await makeRequest('/api/farms', 'GET');
        console.log(`   Status: ${result.status}, Response: ${JSON.stringify(result.data)}`);
      } catch (error) {
        console.log(`   Erreur: ${error.message}`);
      }
    }
    console.log('');

    // Test 3: Tester différentes méthodes
    console.log('3️⃣ Test des méthodes...');
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    for (const method of methods) {
      console.log(`   ${method} /api/farms`);
      try {
        const result = await makeRequest('/api/farms', method, method === 'POST' ? { name: 'Test' } : null);
        console.log(`   Status: ${result.status}, Response: ${JSON.stringify(result.data)}`);
      } catch (error) {
        console.log(`   Erreur: ${error.message}`);
      }
    }
    console.log('');

    // Test 4: Tester avec des données minimales
    console.log('4️⃣ Test avec données minimales...');
    const minimalData = [
      {},
      { name: 'Test' },
      { id: 'test123' },
      { name: 'Test', id: 'test123' }
    ];

    for (let i = 0; i < minimalData.length; i++) {
      console.log(`   Test ${i + 1} avec données:`, minimalData[i]);
      try {
        const result = await makeRequest('/api/farms', 'POST', minimalData[i]);
        console.log(`   Status: ${result.status}, Response: ${JSON.stringify(result.data)}`);
      } catch (error) {
        console.log(`   Erreur: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

testAPI();