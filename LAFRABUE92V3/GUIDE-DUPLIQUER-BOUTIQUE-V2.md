# 📝 GUIDE COMPLET : Dupliquer LAFABRIQUE92V3 pour une nouvelle boutique

## 🎯 Vue d'ensemble
Ce guide vous permet de créer une nouvelle boutique indépendante basée sur LAFABRIQUE92V3 avec toutes les améliorations récentes.

## ✅ Prérequis
- Git installé
- Node.js installé (v18+)
- Compte GitHub
- Compte Cloudflare (Worker, D1, R2)
- Compte Vercel
- Wrangler CLI installé (`npm install -g wrangler`)

---

## 📋 ÉTAPE 1 : Créer le nouveau dépôt GitHub

### 1.1 Créer le repo sur GitHub.com
1. Allez sur https://github.com/new
2. Nom du repo : `NOM_BOUTIQUE` (ex: PHARMHASHV3, CalitekV3)
3. Public ou Private
4. **NE PAS** initialiser avec README
5. Create repository

### 1.2 Cloner LAFABRIQUE92V3 localement
```bash
cd C:\Users\PC\Documents\

git clone https://github.com/juniorrrrr345/LAFABRIQUE92V3.git NOM_NOUVELLE_BOUTIQUE

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

```bash
wrangler d1 create NOM-DB
```
Exemple : `wrangler d1 create pharmhash-db`

**Notez :**
- `database_name` : pharmhash-db
- `database_id` : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

---

## 📋 ÉTAPE 3 : Créer le bucket R2

### 3.1 Créer le bucket
```bash
wrangler r2 bucket create NOM-media
```
Exemple : `wrangler r2 bucket create pharmhash-media`

### 3.2 Activer l'accès public
```bash
wrangler r2 bucket notification create NOM-media --event-type object-create --queue queue-name
```

### 3.3 Configuration CORS (important pour l'upload)
Créez un fichier `cors.json` :
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

Appliquez la configuration :
```bash
wrangler r2 bucket cors put NOM-media --rules cors.json
```

---

## 📋 ÉTAPE 4 : Modifier wrangler.toml

```bash
notepad wrangler.toml
```

Remplacez TOUT par :
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

---

## 📋 ÉTAPE 5 : Modifier package.json

Mettez à jour le nom du projet :
```json
{
  "name": "nom-boutique",
  "version": "1.0.0",
  ...
}
```

---

## 📋 ÉTAPE 6 : Créer le schéma de base de données

### 6.1 Vérifier worker/schema.sql
Le fichier doit contenir TOUTES les tables nécessaires :

```sql
-- Settings
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    farm TEXT,
    photo TEXT,
    video TEXT,
    medias TEXT,
    variants TEXT,
    price TEXT,
    createdAt TEXT,
    updatedAt TEXT
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT
);

-- Farms
CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    description TEXT
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdAt TEXT,
    updatedAt TEXT
);

-- Données initiales importantes
INSERT OR REPLACE INTO settings (key, value) VALUES
('orderSettings', '{"orderLink":"https://wa.me/33123456789","orderButtonText":"Commander"}'),
('maintenanceMode', '{"maintenanceMode":false,"maintenanceMessage":"🔧 Site en maintenance"}'),
('socialLinks', '[]'),
('backgroundImage', ''),
('heroContent', '{"title":"Bienvenue","subtitle":"Découvrez nos produits"}');
```

### 6.2 Exécuter le schéma
```bash
wrangler d1 execute NOM-DB --file=./worker/schema.sql --remote
```

---

## 📋 ÉTAPE 7 : Configurer les secrets du Worker

```bash
wrangler secret put DEFAULT_ADMIN_USERNAME
```
Entrez : `admin`

```bash
wrangler secret put DEFAULT_ADMIN_PASSWORD
```
Entrez : `MotDePasseFort123!`

```bash
wrangler secret put R2_PUBLIC_URL
```
Entrez l'URL publique de votre bucket R2 (vous l'obtiendrez après configuration dans Cloudflare Dashboard)

---

## 📋 ÉTAPE 8 : Déployer le Worker

```bash
wrangler deploy
```

**Notez l'URL** : `https://NOM-WORKER.VOTRE-USERNAME.workers.dev`

---

## 📋 ÉTAPE 9 : Configurer R2 dans Cloudflare Dashboard

1. Allez sur https://dash.cloudflare.com
2. R2 → Votre bucket → Settings
3. Activez "Public Access"
4. Notez l'URL publique : `https://pub-xxxxx.r2.dev`
5. Mettez à jour le secret R2_PUBLIC_URL :
```bash
wrangler secret put R2_PUBLIC_URL
```
Entrez l'URL publique

---

## 📋 ÉTAPE 10 : Initialiser la base de données

```bash
curl https://NOM-WORKER.VOTRE-USERNAME.workers.dev/api/init
```

Résultat attendu : `{"success":true,"message":"Database initialized"}`

---

## 📋 ÉTAPE 11 : Importer les catégories et farms

### 11.1 Créer farms.sql
```sql
INSERT OR REPLACE INTO farms (id, name, description) VALUES
('1', 'Farm Premium', 'Producteur de qualité supérieure'),
('2', 'Farm Organic', 'Culture biologique certifiée'),
('3', 'Farm Local', 'Production locale et artisanale');
```

### 11.2 Créer categories.sql
```sql
INSERT OR REPLACE INTO categories (id, name, icon, description) VALUES
('1', 'Fleurs', '🌸', 'Fleurs de qualité premium'),
('2', 'Huiles', '💧', 'Huiles et extraits'),
('3', 'Comestibles', '🍪', 'Produits comestibles'),
('4', 'Accessoires', '🔧', 'Accessoires et matériel');
```

### 11.3 Importer
```bash
wrangler d1 execute NOM-DB --file=./farms.sql --remote
wrangler d1 execute NOM-DB --file=./categories.sql --remote
```

---

## 📋 ÉTAPE 12 : Push sur GitHub

```bash
git add .
git commit -m "Configure NOM_BOUTIQUE avec toutes les améliorations LAFABRIQUE92V3"
git push origin main
```

---

## 📋 ÉTAPE 13 : Déployer sur Vercel

### 13.1 Connecter le repo sur Vercel
1. https://vercel.com/new
2. Import Git Repository → Sélectionnez votre nouveau repo
3. Framework Preset: Vite
4. Root Directory: `./LAFRABUE92V3` (si applicable)
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy

### 13.2 Configurer la variable d'environnement
1. Settings → Environment Variables
2. Add New :
   - **Name** : `VITE_API_URL`
   - **Value** : `https://NOM-WORKER.VOTRE-USERNAME.workers.dev`
   - **Environments** : Production, Preview, Development
3. Save

### 13.3 Redéployer
1. Deployments
2. Dernier déploiement → ⋮ → Redeploy
3. **Décocher** "Use existing Build Cache"
4. Redeploy

---

## ✅ ÉTAPE 14 : Configuration finale dans l'admin

### 14.1 Se connecter à l'admin
- URL : `https://VOTRE-BOUTIQUE.vercel.app/admin/login`
- Username : `admin`
- Password : `MotDePasseFort123!`

### 14.2 Configurer les paramètres essentiels

#### 1. **Lien de commande** (IMPORTANT)
Admin → Order Settings
- Lien de commande : `https://wa.me/33123456789` (remplacez par votre numéro)
- Texte du bouton : "Commander"
- **Sauvegarder**

#### 2. **Réseaux sociaux**
Admin → Socials
- Ajoutez vos liens sociaux
- Instagram, Telegram, etc.

#### 3. **Paramètres généraux**
Admin → Settings
- Nom de la boutique
- Image de fond
- Contenu Hero

---

## 🔧 Corrections importantes incluses

### ✅ Affichage mobile optimisé
- Produits affichés par 2 sur mobile
- Catégories responsive
- Navigation adaptée

### ✅ Position des questionnaires admin
- Positionnement `items-start` avec `pt-20`
- Plus d'espace en haut
- Position naturelle

### ✅ Améliorations visuelles
- Loader GrinderGif au démarrage
- Animations fluides sur les produits
- Mode sombre/clair avec toggle
- Galerie d'images avec zoom
- Effets de survol améliorés

### ✅ Performance
- Pas de chargement sur les pages
- Accès instantané aux produits
- Optimisations React

---

## 🎉 Terminé !

Votre nouvelle boutique est opérationnelle avec :

✅ Base de données D1 indépendante  
✅ Bucket R2 indépendant avec upload fonctionnel  
✅ Worker Cloudflare indépendant  
✅ Déploiement Vercel indépendant  
✅ Toutes les améliorations de LAFABRIQUE92V3  
✅ Interface moderne et responsive  
✅ Panel admin complet et fonctionnel  

---

## 📱 Points de vérification

1. **Mobile** : Vérifiez que les produits s'affichent par 2
2. **Upload** : Testez l'upload d'images dans l'admin
3. **Commande** : Vérifiez que le lien WhatsApp fonctionne
4. **Loader** : Le GIF doit apparaître 3 secondes au démarrage
5. **Theme** : Le toggle clair/sombre doit fonctionner

---

## 🆘 Dépannage

### Erreur CORS sur R2
```bash
wrangler r2 bucket cors put NOM-media --rules cors.json
```

### Upload ne fonctionne pas
Vérifiez le secret R2_PUBLIC_URL :
```bash
wrangler secret list
```

### Base de données vide
Réinitialisez :
```bash
curl https://VOTRE-WORKER.workers.dev/api/init
```

---

## 📝 Notes importantes

- **Tokens** : Ne jamais commiter vos tokens GitHub/Cloudflare
- **Sécurité** : Changez le mot de passe admin après la première connexion
- **Backup** : Sauvegardez régulièrement votre base D1
- **Updates** : Surveillez les mises à jour de LAFABRIQUE92V3

Besoin d'aide ? Les erreurs sont vos amies, lisez-les attentivement ! 😊