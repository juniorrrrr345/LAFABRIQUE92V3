-- Vérifier les données dans chaque table de la base de données D1
-- À exécuter dans la console D1

-- 1. Vérifier le nombre d'éléments dans chaque table
SELECT 'admin_users' as table_name, COUNT(*) as count FROM admin_users
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'farms', COUNT(*) FROM farms
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'settings', COUNT(*) FROM settings
UNION ALL
SELECT 'socials', COUNT(*) FROM socials
UNION ALL
SELECT 'users', COUNT(*) FROM users;

-- 2. Vérifier quelques exemples de données
SELECT '=== CATEGORIES ===' as info;
SELECT id, name, icon FROM categories LIMIT 5;

SELECT '=== FARMS ===' as info;
SELECT id, name, description FROM farms LIMIT 5;

SELECT '=== PRODUCTS ===' as info;
SELECT id, name, category, farm FROM products LIMIT 5;

SELECT '=== SETTINGS ===' as info;
SELECT key, value FROM settings;

SELECT '=== SOCIALS ===' as info;
SELECT id, name, url FROM socials LIMIT 5;