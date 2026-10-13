const pool = require('../config/db');

async function getAll() {
  const [rows] = await pool.query('SELECT id, typeName FROM book_type ORDER BY id');
  return rows;
}

module.exports = { getAll };