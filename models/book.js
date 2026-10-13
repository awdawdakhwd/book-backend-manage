const pool = require('../config/db');

async function getAll(page = 1, search = '') {
  const limit = 5;
  const offset = (page - 1) * limit;
  let countSql, dataSql;
  const params = [];

  if (search) {
    countSql = 'SELECT COUNT(*) AS total FROM book_info WHERE bookName LIKE ?';
    dataSql = `
      SELECT bi.*, bt.typeName
      FROM book_info bi
      LEFT JOIN book_type bt ON bi.bookType = bt.id
      WHERE bi.bookName LIKE ?
      ORDER BY bi.creationTime DESC
      LIMIT ? OFFSET ?
    `;
    params.push(`%${search}%`, limit, offset);
  } else {
    countSql = 'SELECT COUNT(*) AS total FROM book_info';
    dataSql = `
      SELECT bi.*, bt.typeName
      FROM book_info bi
      LEFT JOIN book_type bt ON bi.bookType = bt.id
      ORDER BY bi.creationTime DESC
      LIMIT ? OFFSET ?
    `;
    params.push(limit, offset);
  }

  const [[{ total }]] = await pool.query(countSql, search ? [`%${search}%`] : []);
  const [rows] = await pool.query(dataSql, params);

  return { rows, total, page, totalPages: Math.ceil(total / limit) };
}

async function getById(bookId) {
  const [rows] = await pool.query(
    `SELECT bi.*, bt.typeName
     FROM book_info bi
     LEFT JOIN book_type bt ON bi.bookType = bt.id
     WHERE bi.bookId = ?`,
    [bookId]
  );
  return rows[0] || null;
}

async function create(data) {
  const { bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy } = data;
  const [result] = await pool.query(
    `INSERT INTO book_info (bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed || 0, createdBy]
  );
  return result.insertId;
}

async function update(bookId, data) {
  const { bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed } = data;
  const [result] = await pool.query(
    `UPDATE book_info
     SET bookCode = ?, bookName = ?, bookType = ?, bookAuthor = ?, publishPress = ?, publishDate = ?, borrowed = ?, lastUpdatetime = NOW()
     WHERE bookId = ?`,
    [bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, bookId]
  );
  return result.affectedRows;
}

async function remove(bookId) {
  const [result] = await pool.query('DELETE FROM book_info WHERE bookId = ?', [bookId]);
  return result.affectedRows;
}

module.exports = { getAll, getById, create, update, remove };