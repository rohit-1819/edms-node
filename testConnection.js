const pool = require('./config/db'); // your db.js file

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connected to Supabase:', result.rows[0]);
  } catch (err) {
    console.error('Failed to connect to Supabase:', err.message);
  }
}

testConnection();
