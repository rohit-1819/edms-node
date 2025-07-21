require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false // needed for Supabase SSL
  }
});

pool.connect()
  .then(client => {
    console.log("✅ Connected to Supabase DB");
    client.release();
  })
  .catch(err => {
    console.error("❌ DB Connection Error:", err);
  });

module.exports = pool;
