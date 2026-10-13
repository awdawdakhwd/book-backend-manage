const express = require('express');
const path = require('path');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

// 模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', booksRouter);

app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
});