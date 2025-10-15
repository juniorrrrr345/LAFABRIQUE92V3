# 🏪 GUIDE COMPLET : Dupliquer le projet pour une nouvelle boutique

## 🎯 Vue d'ensemble
Ce guide vous permet de créer une nouvelle boutique indépendante avec sa propre base de données, son propre Worker et son propre déploiement.

## ✅ Prérequis
- Git installé
- Node.js installé
- Compte GitHub
- Compte Cloudflare (Worker, D1, R2)
- Compte Vercel
- Wrangler CLI installé

---

## 📋 ÉTAPE 1 : Créer le nouveau dépôt GitHub

### 1.1 Créer le repo sur GitHub.com
1. Allez sur https://github.com/new
2. **Nom du repo** : `NOM_BOUTIQUE` (ex: PHARMHASHV3, CalitekV3)
3. **Public** ou **Private**
4. **NE PAS** initialiser avec README
5. Cliquez sur **Create repository**

### 1.2 Cloner le projet original localement
```bash
cd C:\Users\PC\Documents\THEGD33V3

git clone https://github.com/juniorrrrr345/CalitekV3.git NOM_NOUVELLE_BOUTIQUE

cd NOM_NOUVELLE_BOUTIQUE
```

### 1.3 Changer l'origine Git
```bash
git remote remove origin

git remote add origin https://github.com/VOTRE_USERNAME/NOM_BOUTIQUE.git

git push -u origin main
```

Si rejeté :
```bash
git push -u origin main --force
```

---

## 📋 ÉTAPE 2 : Créer la base de données D1

### 2.1 Créer la base de données
```bash
wrangler d1 create NOM-DB
```
**Exemple** : `wrangler d1 create pharmhash-db`

**⚠️ NOTEZ** :
- `database_name` : pharmhash-db
- `database_id` : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

### 2.2 Exécuter le schéma complet
```bash
wrangler d1 execute NOM-DB --file=./worker/schema.sql --remote
```

**Vérifier les tables créées** :
```bash
wrangler d1 execute NOM-DB --command="SELECT name FROM sqlite_master WHERE type='table';" --remote
```

**Tables attendues** :
- `settings`
- `products`
- `categories`
- `farms`
- `users`
- `socials` (si ajoutée)

---

## 📋 ÉTAPE 3 : Créer le bucket R2

### 3.1 Créer le bucket
```bash
wrangler r2 bucket create NOM-media
```
**Exemple** : `wrangler r2 bucket create pharmhash-media`

### 3.2 Activer l'accès public
```bash
wrangler r2 bucket dev-url enable NOM-media
```

**⚠️ NOTEZ l'URL** : `https://pub-xxxxxx.r2.dev`

---

## 📋 ÉTAPE 4 : Modifier wrangler.toml

### 4.1 Configuration complète
```toml
name = "NOM-WORKER"
main = "worker/index.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "NOM-DB"
database_id = "VOTRE-DATABASE-ID"

[[r2_buckets]]
binding = "R2"
bucket_name = "NOM-media"
```

**Exemple pour PHARMHASHV3** :
```toml
name = "pharmhashv3"
main = "worker/index.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "pharmhash-db"
database_id = "20457ff0-e53f-4f8c-8a47-3159ab44422f"

[[r2_buckets]]
binding = "R2"
bucket_name = "pharmhash-media"
```

---

## 📋 ÉTAPE 5 : Modifier worker/index.js (URL R2)

### 5.1 Trouver et remplacer l'URL R2
Ouvrez `worker/index.js` et cherchez (Ctrl+F) : `pub-`

**Remplacer l'URL R2** (ligne ~721) :
```javascript
// ANCIEN
const url = `https://pub-ANCIENNE-URL.r2.dev/${filename}`

// NOUVEAU
const url = `https://pub-VOTRE-NOUVELLE-URL.r2.dev/${filename}`
```

---

## 📋 ÉTAPE 6 : Créer le schéma de base de données complet

### 6.1 Vérifier worker/schema.sql
Le fichier doit contenir :

```sql
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    farm TEXT,
    photo TEXT,
    video TEXT,
    image TEXT,
    medias TEXT,
    variants TEXT,
    price TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS socials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Exécuter le schéma
```bash
wrangler d1 execute NOM-DB --file=./worker/schema.sql --remote
```

---

## 📋 ÉTAPE 7 : Configurer les secrets du Worker

### 7.1 Variables secrètes
```bash
wrangler secret put DEFAULT_ADMIN_USERNAME
# Entrez : admin

wrangler secret put DEFAULT_ADMIN_PASSWORD
# Entrez : MotDePasseFort123!
```

---

## 📋 ÉTAPE 8 : Déployer le Worker

### 8.1 Déployer
```bash
wrangler deploy
```

**⚠️ NOTEZ l'URL** : `https://NOM-WORKER.VOTRE-USERNAME.workers.dev`

### 8.2 Initialiser la base de données
```bash
curl https://NOM-WORKER.VOTRE-USERNAME.workers.dev/api/init
```

**Résultat attendu** :
```json
{"success":true,"message":"Database initialized"}
```

---

## 📋 ÉTAPE 9 : Importer les données de base

### 9.1 Créer farms.sql
```sql
INSERT OR REPLACE INTO farms (id, name, description) VALUES
('1', 'Farm 1', 'Description de la première ferme'),
('2', 'Farm 2', 'Description de la deuxième ferme'),
('3', 'Farm 3', 'Description de la troisième ferme');
```

### 9.2 Créer categories.sql
```sql
INSERT OR REPLACE INTO categories (id, name, icon, description) VALUES
('1', 'Catégorie 1', '🏷️', 'Description de la première catégorie'),
('2', 'Catégorie 2', '🏷️', 'Description de la deuxième catégorie'),
('3', 'Catégorie 3', '🏷️', 'Description de la troisième catégorie');
```

### 9.3 Importer les données
```bash
wrangler d1 execute NOM-DB --file=./farms.sql --remote
wrangler d1 execute NOM-DB --file=./categories.sql --remote
```

---

## 📋 ÉTAPE 10 : Push sur GitHub

```bash
git add .
git commit -m "Configure NOM_BOUTIQUE"
git push origin main
```

---

## 📋 ÉTAPE 11 : Déployer sur Vercel

### 11.1 Connecter le repo sur Vercel
1. Allez sur https://vercel.com/new
2. **Import Git Repository** → Sélectionnez votre nouveau repo
3. Cliquez sur **Deploy**

### 11.2 Configurer la variable d'environnement
1. **Settings** → **Environment Variables**
2. **Add New** :
   - **Name** : `VITE_API_URL`
   - **Value** : `https://NOM-WORKER.VOTRE-USERNAME.workers.dev`
   - **Environments** : Production, Preview, Development
3. Cliquez sur **Save**

### 11.3 Redéployer
1. **Deployments**
2. Dernier déploiement → **⋮** → **Redeploy**
3. Décocher **"Use existing Build Cache"**
4. Cliquez sur **Redeploy**

---

## 📋 ÉTAPE 12 : CORRECTIONS OBLIGATOIRES

### ⚠️ CORRECTIONS CRITIQUES À APPLIQUER

Après duplication, vous DEVEZ appliquer ces corrections :

#### 12.1 Corriger les Modaux (Questionnaires) - CRITIQUE !

**Problème** : Les formulaires d'ajout s'affichent mal et sont coupés.

**Fichiers à modifier** :
- `src/pages/admin/Products.jsx`
- `src/pages/admin/Categories.jsx`
- `src/pages/admin/Farms.jsx`
- `src/pages/admin/Socials.jsx`
- `src/pages/admin/AdminUsers.jsx`

**Dans CHAQUE fichier**, cherchez le modal et appliquez ces changements :

**CHANGEMENT 1** - Au début du modal, REMPLACER :
```jsx
<motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <motion.div className="neon-border rounded-2xl p-8 bg-slate-900 max-w-md w-full">
```

**PAR** :
```jsx
<motion.div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] overflow-y-auto">
  <div className="min-h-screen px-4 py-8 flex items-center justify-center">
    <motion.div className="neon-border rounded-2xl p-8 bg-slate-900 max-w-md w-full">
```

**CHANGEMENT 2** - À la fin du modal, REMPLACER :
```jsx
    </motion.div>
  </motion.div>
```

**PAR** :
```jsx
    </motion.div>
  </div>
</motion.div>
```

#### 12.2 Ajuster l'affichage mobile (2 produits par ligne)

**Fichier** : `src/pages/Products.jsx`

**Remplacer** :
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 max-h-[95vh]">
```

**PAR** :
```jsx
<div className="grid grid-cols-2 md:grid-cols-2 max-h-[95vh]">
```

#### 12.3 Ajuster les catégories mobile

**Fichier** : `src/pages/admin/Categories.jsx`

**Remplacer** :
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
```

**PAR** :
```jsx
<div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
```

#### 12.4 Corriger la position des questionnaires

**Problème** : Les questionnaires apparaissent au centre exact de l'écran.

**Solution** : Dans tous les modaux, remplacer :
```jsx
<div className="min-h-screen px-4 py-8 flex items-center justify-center">
```

**PAR** :
```jsx
<div className="min-h-screen px-4 pt-20 flex items-start justify-center">
```

---

## 📋 ÉTAPE 13 : Configurer les liens de commande et réseaux sociaux

### 13.1 Ajouter le support des liens de commande

**Fichier** : `src/pages/admin/Settings.jsx`

Ajouter dans le formulaire de configuration :
```jsx
<div className="space-y-4">
  <h3 className="text-lg font-semibold text-white">Liens de Commande</h3>
  
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Lien de Commande (WhatsApp, Telegram, etc.)
    </label>
    <input
      type="url"
      value={settings.orderLink || ''}
      onChange={(e) => setSettings({...settings, orderLink: e.target.value})}
      className="w-full px-3 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white"
      placeholder="https://wa.me/33123456789"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Texte du Bouton de Commande
    </label>
    <input
      type="text"
      value={settings.orderButtonText || 'Commander maintenant'}
      onChange={(e) => setSettings({...settings, orderButtonText: e.target.value})}
      className="w-full px-3 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white"
      placeholder="Commander maintenant"
    />
  </div>
</div>
```

### 13.2 Mettre à jour le schéma de base de données

**Ajouter dans worker/schema.sql** :
```sql
-- Ajouter les colonnes pour les liens de commande dans la table settings
-- (Les settings sont stockées en JSON, donc pas besoin de modifier le schéma)
```

**Mettre à jour l'initialisation dans worker/index.js** :
```javascript
// Dans la fonction d'initialisation, ajouter :
await env.DB.prepare(`
  INSERT OR REPLACE INTO settings (key, value) VALUES 
  ('orderLink', 'https://wa.me/33123456789'),
  ('orderButtonText', 'Commander maintenant')
`).run();
```

---

## 📋 ÉTAPE 14 : Tester la nouvelle boutique

### 14.1 Test Admin
1. Allez sur `https://VOTRE-BOUTIQUE.vercel.app/admin/login`
2. **Username** : `admin`
3. **Password** : `MotDePasseFort123!`

### 14.2 Test Storefront
1. Allez sur `https://VOTRE-BOUTIQUE.vercel.app`
2. Vérifiez que les produits s'affichent correctement
3. Vérifiez que les catégories s'affichent en 2 colonnes sur mobile
4. Vérifiez que les modaux s'affichent correctement

---

## ✅ CHECKLIST FINALE

### Base de Données
- [ ] Nouvelle base D1 créée
- [ ] Tables initialisées (6 tables)
- [ ] `/api/init` appelé et fonctionnel
- [ ] Données de base importées (farms, categories)

### Worker Cloudflare
- [ ] `wrangler.toml` mis à jour (name, database_id, bucket_name)
- [ ] `worker/index.js` mis à jour (URL R2)
- [ ] Variables secrètes configurées (USERNAME, PASSWORD)
- [ ] Worker déployé
- [ ] API testée (`/api/settings` retourne des données)

### Bucket R2
- [ ] Nouveau bucket créé
- [ ] Bucket rendu public
- [ ] URL R2 notée et mise dans `worker/index.js`

### Frontend Vercel
- [ ] Nouveau dépôt GitHub créé
- [ ] `VITE_API_URL` configurée sur Vercel
- [ ] Déploiement réussi
- [ ] Site accessible
- [ ] Admin accessible

### Corrections Appliquées
- [ ] Modaux corrigés (affichage correct)
- [ ] Grille mobile ajustée (2 produits par ligne)
- [ ] Position des questionnaires corrigée
- [ ] Liens de commande configurés
- [ ] Réseaux sociaux fonctionnels

---

## 🎉 Terminé !

Votre nouvelle boutique est opérationnelle avec :

✅ **Base de données D1 indépendante**
✅ **Bucket R2 indépendant**  
✅ **Worker Cloudflare indépendant**
✅ **Déploiement Vercel indépendant**
✅ **Interface mobile optimisée**
✅ **Modaux parfaitement affichés**
✅ **Liens de commande fonctionnels**

---

## 🆘 Problèmes Courants

### 1. "SyntaxError: Unexpected token '<'"
**Cause** : `VITE_API_URL` non configurée sur Vercel
**Solution** : Vercel → Project Settings → Environment Variables → Ajouter `VITE_API_URL`

### 2. "Products not found" / Page vide
**Cause** : `/api/init` pas appelé
**Solution** : `curl https://VOTRE-WORKER.workers.dev/api/init`

### 3. Images ne s'affichent pas
**Cause** : URL R2 incorrecte dans `worker/index.js`
**Solution** : Vérifier et mettre à jour l'URL R2

### 4. "Database not found"
**Cause** : `database_id` incorrect dans `wrangler.toml`
**Solution** : Vérifier avec `wrangler d1 list`

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la **Checklist Finale**
2. Consultez **Problèmes Courants**
3. Vérifiez les logs : `wrangler tail`
4. Vérifiez la console navigateur (F12)

**Besoin d'aide ? Envoyez-moi les erreurs ! 😊**