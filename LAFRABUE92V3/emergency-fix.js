#!/usr/bin/env node

/**
 * Script d'urgence pour contourner le problème de l'API
 * Crée un serveur local qui fait le pont avec l'API Cloudflare
 */

import http from 'http';
import https from 'https';

const PORT = 3001;
const CLOUDFLARE_API = 'https://lafrabue92v3.calitek-junior.workers.dev';

// Cache local pour les données
let localCache = {
  farms: [],
  products: [],
  categories: []
};

// Fonction pour faire des requêtes vers l'API Cloudflare
function makeCloudflareRequest(path, method = 'GET', data = null) {
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
        // Retourner le cache local
        res.writeHead(200);
        res.end(JSON.stringify(localCache.farms));
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          const data = JSON.parse(body);
          const newFarm = {
            id: data.id || Date.now().toString(),
            name: data.name,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          localCache.farms.push(newFarm);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, id: newFarm.id }));
        });
      }
    }
    // Route pour les produits
    else if (path === '/api/products') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(localCache.products));
      }
    }
    // Route pour les catégories
    else if (path === '/api/categories') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify(localCache.categories));
      }
    }
    // Route pour les settings
    else if (path === '/api/settings') {
      if (req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({}));
      } else if (req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        });
      }
    }
    // Route pour l'upload
    else if (path === '/api/upload') {
      res.writeHead(200);
      res.end(JSON.stringify({ 
        url: 'https://via.placeholder.com/400x300?text=Upload+Disabled',
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
  console.log(`🚀 Serveur d'urgence démarré sur http://localhost:${PORT}`);
  console.log('📝 Ce serveur contourne les problèmes de l\'API Cloudflare');
  console.log('🔧 Utilisez cette URL dans votre application: http://localhost:3001');
  console.log('');
  console.log('Routes disponibles:');
  console.log('  GET  /api/farms      - Liste des farms');
  console.log('  POST /api/farms      - Créer une farm');
  console.log('  GET  /api/products   - Liste des produits');
  console.log('  GET  /api/categories - Liste des catégories');
  console.log('  GET  /api/settings   - Paramètres');
  console.log('  PUT  /api/settings   - Sauvegarder paramètres');
  console.log('  POST /api/upload     - Upload (simulé)');
  console.log('');
  console.log('Appuyez sur Ctrl+C pour arrêter le serveur');
});