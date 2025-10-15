import { Router } from 'itty-router';
import { corsHeaders, handleCors } from './cors';
import { initDatabase } from './database';
import { uploadToR2, getR2Url } from './storage';

const router = Router();

// CORS middleware
router.all('*', handleCors);

// Routes API
router.get('/api/init', initDatabase);
router.get('/api/products', getProducts);
router.post('/api/products', createProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);
router.get('/api/categories', getCategories);
router.post('/api/categories', createCategory);
router.get('/api/farms', getFarms);
router.post('/api/farms', createFarm);
router.post('/api/upload', uploadFile);
router.post('/api/admin/login', adminLogin);
router.get('/api/admin/verify', verifyAdmin);

// 404 handler
router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
  async fetch(request, env, ctx) {
    return router.handle(request, env, ctx);
  },
};

// Database functions
async function initDatabase(request, env) {
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

    // Create default admin user
    const defaultUsername = 'admin';
    const defaultPassword = 'MotDePasseFort123!';
    
    await env.DB.prepare(`
      INSERT OR IGNORE INTO admin_users (id, username, password, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      defaultUsername,
      defaultPassword,
      new Date().toISOString(),
      new Date().toISOString()
    ).run();

    return new Response(JSON.stringify({
      success: true,
      message: 'Database initialized'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getProducts(request, env) {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM products ORDER BY createdAt DESC').all();
    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function createProduct(request, env) {
  try {
    const data = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    await env.DB.prepare(`
      INSERT INTO products (id, name, description, category, farm, photo, video, medias, variants, price, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.name || '',
      data.description || '',
      data.category || '',
      data.farm || '',
      data.photo || '',
      data.video || '',
      data.medias || '',
      data.variants || '',
      data.price || '',
      now,
      now
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function updateProduct(request, env) {
  try {
    const { id } = request.params;
    const data = await request.json();
    const now = new Date().toISOString();
    
    await env.DB.prepare(`
      UPDATE products 
      SET name = ?, description = ?, category = ?, farm = ?, photo = ?, video = ?, medias = ?, variants = ?, price = ?, updatedAt = ?
      WHERE id = ?
    `).bind(
      data.name || '',
      data.description || '',
      data.category || '',
      data.farm || '',
      data.photo || '',
      data.video || '',
      data.medias || '',
      data.variants || '',
      data.price || '',
      now,
      id
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function deleteProduct(request, env) {
  try {
    const { id } = request.params;
    
    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getCategories(request, env) {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM categories ORDER BY name').all();
    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function createCategory(request, env) {
  try {
    const data = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    await env.DB.prepare(`
      INSERT INTO categories (id, name, icon, description, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.name || '',
      data.icon || '',
      data.description || '',
      now,
      now
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getFarms(request, env) {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM farms ORDER BY name').all();
    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function createFarm(request, env) {
  try {
    const data = await request.json();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    
    await env.DB.prepare(`
      INSERT INTO farms (id, name, image, description, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.name || '',
      data.image || '',
      data.description || '',
      now,
      now
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function uploadFile(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return new Response(JSON.stringify({ success: false, error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const filename = `${Date.now()}-${file.name}`;
    const url = await uploadToR2(env.R2, file, filename);
    
    return new Response(JSON.stringify({ success: true, url, filename }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function adminLogin(request, env) {
  try {
    const { username, password } = await request.json();
    
    const user = await env.DB.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?')
      .bind(username, password)
      .first();
    
    if (user) {
      return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function verifyAdmin(request, env) {
  return new Response(JSON.stringify({ success: true, message: 'Admin verified' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}