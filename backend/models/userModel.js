const db = require('../config/db');

const getUserByEmail = async (email) => {
  const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

const getUserByID = async (user_id) => {
  const res = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  return res.rows[0];
};

const createHOD = async (hodData) => {
  const { name, email, hashedPassword, department } = hodData;

  const result = await db.query(
    `INSERT INTO users (name, email, password, role, department)
    VALUES ($1, $2, $3, 'HOD', $4)
    RETURNING user_id, name, email, role, department`,
    [name, email, hashedPassword, department]
  );
  return result.rows[0];
};

module.exports = { 
  getUserByEmail,
  getUserByID,
  createHOD
};
