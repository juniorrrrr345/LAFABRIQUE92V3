#!/usr/bin/env node

/**
 * Serveur API local de contournement
 * Remplace l'API Cloudflare défaillante
 */

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

const PORT = 3001;
const CLOUDFLARE_API = 'https://lafrabue92v3.calitek-junior.workers.dev';

// Fichier de stockage local
const DATA_FILE = './local-data.json';

// Charger les données locales
let localData = {
  farms: [],
  products: [],
  categories: [],
  settings: {}
};

// Charger les données existantes
try {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    localData = JSON.parse(data);
    console.log('📁 Données locales chargées');
  }
} catch (error) {
  console.log('📁 Création de nouvelles données locales');
}

// Sauvegarder les données
function saveData() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(localData, null, 2));
  } catch (error) {
    console.error('Erreur sauvegarde:', error);
  }
}

// Fonction pour faire des requêtes vers l'API Cloudflare (lecture seule)
function makeCloudflareRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'lafrabue92v3.calitek-junior.workers.dev',
      port: 443,
      path: path,
      method: method,
      headers: {
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
    req.end();
  });
}

// Serveur local
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  try {
    // Route pour les farms
    if (path === '/api/farms') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(localData.farms));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const data = JSON.parse(body);
          const newFarm = {
            id: data.id || Date.now().toString(),
            name: data.name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          localData.farms.push(newFarm);
          saveData();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: newFarm.id }));
        });
      } else if (req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const data = JSON.parse(body);
          const farmIndex = localData.farms.findIndex(f => f.id === data.id);
          if (farmIndex !== -1) {
            localData.farms[farmIndex] = {
              ...localData.farms[farmIndex],
              ...data,
              updatedAt: new Date().toISOString()
            };
            saveData();
            res.writeHead(200);
            res.end(JSON.stringify({ success: true }));
          } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Farm not found' }));
          }
        });
      } else if (req.method === 'DELETE') {
        const farmId = url.searchParams.get('id') || path.split('/').pop();
        const farmIndex = localData.farms.findIndex(f => f.id === farmId);
        if (farmIndex !== -1) {
          localData.farms.splice(farmIndex, 1);
          saveData();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Farm not found' }));
        }
      }
    }
    // Route pour les produits
    else if (path === '/api/products') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(localData.products));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const data = JSON.parse(body);
          const newProduct = {
            id: data.id || Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          localData.products.push(newProduct);
          saveData();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: newProduct.id }));
        });
      }
    }
    // Route pour les catégories
    else if (path === '/api/categories') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(localData.categories));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const data = JSON.parse(body);
          const newCategory = {
            id: data.id || Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          localData.categories.push(newCategory);
          saveData();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: newCategory.id }));
        });
      }
    }
    // Route pour les settings
    else if (path === '/api/settings') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(localData.settings));
      } else if (req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const data = JSON.parse(body);
          if (data.key) {
            localData.settings[data.key] = data;
          } else {
            Object.assign(localData.settings, data);
          }
          saveData();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        });
      }
    }
    // Route pour l'upload (simulé)
    else if (path === '/api/upload') {
      res.writeHead(200);
      res.end(JSON.stringify({ 
        url: 'https://via.placeholder.com/400x300?text=Upload+Simule',
        filename: 'placeholder.jpg'
      }));
    }
    // Route par défaut
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Serveur API local démarré sur http://localhost:${PORT}`);
  console.log('📝 Ce serveur remplace l\'API Cloudflare défaillante');
  console.log('🔧 Modifiez l\'URL dans votre application: http://localhost:3001');
  console.log('');
  console.log('Routes disponibles:');
  console.log('  GET    /api/farms      - Liste des farms');
  console.log('  POST   /api/farms      - Créer une farm');
  console.log('  PUT    /api/farms      - Modifier une farm');
  console.log('  DELETE /api/farms?id=X - Supprimer une farm');
  console.log('  GET    /api/products   - Liste des produits');
  console.log('  POST   /api/products   - Créer un produit');
  console.log('  GET    /api/categories - Liste des catégories');
  console.log('  POST   /api/categories - Créer une catégorie');
  console.log('  GET    /api/settings   - Paramètres');
  console.log('  PUT    /api/settings   - Sauvegarder paramètres');
  console.log('  POST   /api/upload     - Upload (simulé)');
  console.log('');
  console.log('Appuyez sur Ctrl+C pour arrêter le serveur');
});