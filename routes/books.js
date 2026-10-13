const express = require('express');
const router = express.Router();
const bookModel = require('../models/book');
const bookTypeModel = require('../models/bookType');

// 图书列表（首页）
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || '';
    const { rows, total, totalPages } = await bookModel.getAll(page, search);
    res.render('list', { books: rows, page, totalPages, total, search, message: req.query.msg || '' });
  } catch (err) {
    res.status(500).send('服务器错误: ' + err.message);
  }
});

// 查看图书详情
router.get('/detail/:id', async (req, res) => {
  try {
    const book = await bookModel.getById(req.params.id);
    if (!book) return res.status(404).send('图书不存在');
    res.render('detail', { book, search: req.query.search || '', page: req.query.page || 1 });
  } catch (err) {
    res.status(500).send('服务器错误: ' + err.message);
  }
});

// 新增图书表单
router.get('/add', async (req, res) => {
  try {
    const types = await bookTypeModel.getAll();
    res.render('add', { types });
  } catch (err) {
    res.status(500).send('服务器错误: ' + err.message);
  }
});

// 新增图书提交
router.post('/add', async (req, res) => {
  try {
    const { bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed } = req.body;
    await bookModel.create({
      bookCode, bookName, bookType, bookAuthor, publishPress, publishDate,
      borrowed: borrowed || 0,
      createdBy: '系统管理员'
    });
    res.redirect('/?msg=新增成功');
  } catch (err) {
    res.redirect('/?msg=新增失败: ' + err.message);
  }
});

// 修改图书表单
router.get('/edit/:id', async (req, res) => {
  try {
    const book = await bookModel.getById(req.params.id);
    if (!book) return res.status(404).send('图书不存在');
    const types = await bookTypeModel.getAll();
    res.render('edit', { book, types });
  } catch (err) {
    res.status(500).send('服务器错误: ' + err.message);
  }
});

// 修改图书提交
router.post('/edit/:id', async (req, res) => {
  try {
    const { bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed } = req.body;
    await bookModel.update(req.params.id, {
      bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed: borrowed || 0
    });
    res.redirect('/?msg=修改成功');
  } catch (err) {
    res.redirect('/?msg=修改失败: ' + err.message);
  }
});

// 删除图书
router.get('/delete/:id', async (req, res) => {
  try {
    await bookModel.remove(req.params.id);
    res.redirect('/?msg=删除成功');
  } catch (err) {
    res.redirect('/?msg=删除失败: ' + err.message);
  }
});

module.exports = router;