# 图书借阅系统后台管理

基于 **Express + MySQL** 的图书借阅系统后台管理，支持图书的增删改查、分页展示、模糊搜索等功能。

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | Express (Node.js) |
| 模板引擎 | EJS |
| 数据库 | MySQL 8.0 |
| 数据库驱动 | mysql2 (Promise API) |
| 前端 | 原生 HTML/CSS + jQuery 验证 |
| CI/CD | GitHub Actions |

## 功能列表

- ✅ **图书列表** — 按入库时间降序排列，隔行变色，每页 5 条
- ✅ **模糊搜索** — 按图书名称模糊查询，记忆搜索条件
- ✅ **查看详情** — 展示 9 个字段，全部只读
- ✅ **新增图书** — 表单验证，图书类型下拉框来源于 `book_type` 表，入库人/时间自动填充
- ✅ **修改图书** — 表单回填，入库人和入库时间只读不可改
- ✅ **删除图书** — 弹出确认对话框，删除后返回列表并提示结果
- ✅ **分页导航** — 显示总记录数、当前页/总页数、上一页/下一页

## 数据库设计

### book_info（图书信息表）

| 字段 | 类型 | 说明 |
|------|------|------|
| bookId | INT | 主键，自增 |
| bookCode | VARCHAR(50) | 图书编号 |
| bookName | VARCHAR(100) | 图书名称 |
| bookType | INT | 图书类型（外键 → book_type.id） |
| bookAuthor | VARCHAR(50) | 作者 |
| publishPress | VARCHAR(100) | 出版社 |
| publishDate | DATE | 出版日期 |
| borrowed | INT | 是否借阅（0=未借阅，1=已借阅） |
| createdBy | VARCHAR(50) | 入库人 |
| creationTime | DATETIME | 入库时间 |
| lastUpdatetime | DATETIME | 最新更新时间 |

### book_type（图书类型表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键，自增 |
| typeName | VARCHAR(50) | 类型名称（小说/文学/传记/艺术/少儿/经济/管理/科技） |

## 快速开始

### 前提条件

- Node.js 18+
- MySQL 8.0（或 XAMPP 自带的 MariaDB/MySQL）

### 1. 克隆项目

```bash
git clone https://github.com/awdawdakhwd/book-backend-manage.git
cd book-backend-manage
```

### 2. 安装依赖

```bash
npm install
```

### 3. 初始化数据库

```bash
mysql -u root -p < sql/init.sql
```

> 无密码时省略 `-p`，如：`mysql -u root < sql/init.sql`

### 4. 配置数据库连接（可选）

默认连接 `localhost:3306`，用户 `root`，无密码，数据库 `book_manage`。如需修改，设置环境变量：

```bash
set DB_HOST=localhost
set DB_USER=root
set DB_PASSWORD=your_password
set DB_NAME=book_manage
```

### 5. 启动服务

```bash
npm start
```

打开浏览器访问 **http://localhost:3000**

## 项目结构

```
book-backend-manage/
├── app.js                    # 应用入口
├── package.json
├── config/
│   └── db.js                 # MySQL 连接池
├── models/
│   ├── book.js               # 图书 CRUD + 分页搜索
│   └── bookType.js           # 图书类型查询
├── routes/
│   └── books.js              # 路由定义（7 条）
├── views/
│   ├── list.ejs              # 图书列表页
│   ├── detail.ejs            # 图书详情页
│   ├── add.ejs               # 新增图书页
│   └── edit.ejs              # 修改图书页
├── public/
│   ├── css/style.css         # 样式
│   └── js/main.js            # 前端脚本
├── sql/
│   └── init.sql              # 建库 + 建表 + 测试数据
└── .github/
    └── workflows/
        └── test.yml          # CI 回归测试
```

## API 路由

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/` | 图书列表（支持 `?page=&search=`） |
| GET | `/detail/:id` | 查看图书详情 |
| GET | `/add` | 新增图书表单 |
| POST | `/add` | 提交新增 |
| GET | `/edit/:id` | 修改图书表单 |
| POST | `/edit/:id` | 提交修改 |
| GET | `/delete/:id` | 删除图书 |

## CI / CD

每次 push 或 PR 到 `master` 分支时，GitHub Actions 自动执行：

1. 启动 MySQL 8.0 服务
2. 导入 `sql/init.sql` 初始化数据库
3. 安装依赖
4. 运行 `npm test`