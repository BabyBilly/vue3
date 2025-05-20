const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const detailsFilePath = path.join(__dirname, '../details.json');

// 读取详情数据
const readDetails = () => {
  try {
    const data = fs.readFileSync(detailsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// 获取详情信息接口
router.get('/detail/:id', (req, res) => {
  const { id } = req.params;
  const details = readDetails();
  const detail = details.find(d => d.id.toString() === id);

  if (detail) {
    res.json(detail);
  } else {
    res.status(404).json({ message: '详情信息未找到' });
  }
});

module.exports = router;
