#!/usr/bin/env node

/**
 * Script de déploiement du worker Cloudflare
 * Force la mise à jour du worker avec les dernières modifications
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Déploiement du worker Cloudflare...');

try {
  // Vérifier que wrangler est installé
  console.log('📦 Vérification de wrangler...');
  execSync('npx wrangler --version', { stdio: 'pipe' });
  
  // Déployer le worker
  console.log('🔄 Déploiement en cours...');
  execSync('npx wrangler deploy --compatibility-date=2024-01-01', { 
    stdio: 'inherit',
    cwd: '/workspace/LAFRABUE92V3'
  });
  
  console.log('✅ Worker déployé avec succès !');
  console.log('🌐 URL: https://lafrabue92v3.calitek-junior.workers.dev');
  
} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}