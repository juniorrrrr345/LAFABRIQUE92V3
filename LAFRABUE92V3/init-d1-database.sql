-- Script SQL pour initialiser la base de données D1
-- À exécuter dans la console D1 de Cloudflare

-- 1. Créer la table des produits
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
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 2. Créer la table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 3. Créer la table des farms
CREATE TABLE IF NOT EXISTS farms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    description TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 4. Créer la table des réseaux sociaux
CREATE TABLE IF NOT EXISTS socials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    url TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 5. Créer la table des settings
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 6. Créer la table des utilisateurs admin
CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 7. Créer la table des commandes
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customerName TEXT,
    customerEmail TEXT,
    customerPhone TEXT,
    items TEXT,
    total TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 8. Insérer un utilisateur admin par défaut
INSERT OR IGNORE INTO admin_users (id, username, password, createdAt, updatedAt)
VALUES ('admin-1', 'admin', 'admin123', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 9. Insérer des settings par défaut
INSERT OR IGNORE INTO settings (key, value, updated_at)
VALUES ('general', '{"shopName":"CALITEK","heroTitle":"CALITEK","heroSubtitle":"X FRAPPEIDF","maintenanceMode":false}', CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO settings (key, value, updated_at)
VALUES ('orderSettings', '{"orderLink":"https://wa.me/33123456789","orderButtonText":"Commander"}', CURRENT_TIMESTAMP);

-- 10. Insérer quelques catégories d'exemple
INSERT OR IGNORE INTO categories (id, name, icon, description, createdAt)
VALUES 
    ('cat-1', 'Cali top SHELF 5A🇺🇸', '🏷️', 'Catégorie premium', CURRENT_TIMESTAMP),
    ('cat-2', 'Fresh Frozen 🥶', '🏷️', 'Produits frais congelés', CURRENT_TIMESTAMP),
    ('cat-3', 'Single Source 130/90u ⚫️', '🏷️', 'Source unique', CURRENT_TIMESTAMP);

-- 11. Insérer quelques farms d'exemple
INSERT OR IGNORE INTO farms (id, name, image, description, createdAt)
VALUES 
    ('farm-1', '🇳🇱 NL COFFEE SHOP 🇳🇱', NULL, 'Production CALITEK', CURRENT_TIMESTAMP),
    ('farm-2', 'Cali top SHELF 🇺🇸', NULL, 'Production premium', CURRENT_TIMESTAMP),
    ('farm-3', 'Sahas Terps 🚀', NULL, 'Production spécialisée', CURRENT_TIMESTAMP);

-- 12. Insérer quelques réseaux sociaux d'exemple
INSERT OR IGNORE INTO socials (id, name, icon, description, url, createdAt)
VALUES 
    ('social-1', 'TELEGRAM OFFICIEL', '🆔', 'Groupe officiel', 'https://t.me/+UcjK8ACxPBcxODU0', CURRENT_TIMESTAMP),
    ('social-2', 'INSTAGRAM', '📸', 'Page Instagram', 'https://www.instagram.com/calitek_officiel', CURRENT_TIMESTAMP),
    ('social-3', 'POUR COMMANDER', '🛒', 'WhatsApp commandes', 'http://wa.me/33620056669', CURRENT_TIMESTAMP);

-- Vérifier que tout a été créé
SELECT 'Tables créées avec succès' as status;