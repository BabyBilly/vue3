const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

// 读取用户数据
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// 获取用户信息接口
router.get('/user/:username', (req, res) => {
  const { username } = req.params;
  const users = readUsers();
  const user = users.find(u => u.username === username);

  if (user) {
    // 不返回密码信息
    const { password, ...userInfo } = user;
    res.json(userInfo);
  } else {
    res.status(404).json({ message: '用户未找到' });
  }
});

module.exports = router;
