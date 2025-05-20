const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken'); // 新增

const usersFilePath = path.join(__dirname, '../users.json');
const JWT_SECRET = 'your_jwt_secret'; // 建议放到环境变量

// 读取用户数据
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// 写入用户数据
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// 注册接口
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: '用户名已存在' });
  }

  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.status(500).json({ message: '生成盐值时出错' });
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: '生成哈希值时出错' });
      }

      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        username,
        password: hash
      };

      users.push(newUser);
      writeUsers(users);

      // 注册成功后直接生成 token 返回
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(201).json({ message: '注册成功', token });
    });
  });
});

// 登录接口
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    // 登录成功生成 token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ message: '登录成功', token });
  } else {
    res.status(401).json({ message: '用户名或密码错误' });
  }
});

module.exports = router;


