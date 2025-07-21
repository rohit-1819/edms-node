const fs = require('fs');

require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, '../certs/prod-ca-2021.crt')).toString(),
  },
});

module.exports = pool;
