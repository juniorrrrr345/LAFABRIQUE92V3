export async function initDatabase(env) {
  try {
    await env.DB.exec(`
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
        medias TEXT,
        variants TEXT,
        price TEXT,
        createdAt TEXT,
        updatedAt TEXT
      );
      
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT,
        description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS farms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT,
        description TEXT
      );
      
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt TEXT,
        updatedAt TEXT
      );
    `);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}