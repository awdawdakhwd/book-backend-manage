-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS book_manage DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE book_manage;

-- 图书类型表
DROP TABLE IF EXISTS book_type;
CREATE TABLE book_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  typeName VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 图书信息表
DROP TABLE IF EXISTS book_info;
CREATE TABLE book_info (
  bookId INT AUTO_INCREMENT PRIMARY KEY,
  bookCode VARCHAR(50) NOT NULL,
  bookName VARCHAR(100) NOT NULL,
  bookType INT NOT NULL,
  bookAuthor VARCHAR(50) NOT NULL,
  publishPress VARCHAR(100) NOT NULL,
  publishDate DATE NOT NULL,
  borrowed INT NOT NULL DEFAULT 0,
  createdBy VARCHAR(50) NOT NULL,
  creationTime DATETIME NOT NULL,
  lastUpdatetime DATETIME,
  FOREIGN KEY (bookType) REFERENCES book_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入图书类型测试数据
INSERT INTO book_type (typeName) VALUES ('小说'), ('文学'), ('传记'), ('艺术'), ('少儿'), ('经济'), ('管理'), ('科技');

-- 插入图书测试数据
INSERT INTO book_info (bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime) VALUES
('B001', '红楼梦', 1, '曹雪芹', '人民文学出版社', '1996-12-01', 0, '系统管理员', '2024-01-15 09:00:00'),
('B002', '活着', 2, '余华', '作家出版社', '2012-08-01', 1, '系统管理员', '2024-02-20 10:30:00'),
('B003', '史蒂夫·乔布斯传', 3, '沃尔特·艾萨克森', '中信出版社', '2011-10-24', 0, '系统管理员', '2024-03-10 14:00:00'),
('B004', '美的历程', 4, '李泽厚', '生活·读书·新知三联书店', '2009-07-01', 1, '系统管理员', '2024-04-05 08:20:00'),
('B005', '小王子', 5, '圣埃克苏佩里', '人民文学出版社', '2003-08-01', 0, '系统管理员', '2024-05-12 16:45:00'),
('B006', '经济学原理', 6, '曼昆', '北京大学出版社', '2015-01-01', 0, '系统管理员', '2024-06-01 11:00:00'),
('B007', '从优秀到卓越', 7, '吉姆·柯林斯', '中信出版社', '2009-11-01', 1, '系统管理员', '2024-07-18 13:30:00');