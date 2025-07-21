require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('../prod-ca-2021.crt').toString(),
  },
});

module.exports = pool;
