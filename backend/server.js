const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// 引入路由
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const detailRoutes = require('./routes/detail');

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', detailRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 访问接口可用curl命令行工具进行测试/postman/httobot等工具
// curl -X POST http://localhost:3000/api/register \
//   -H "Content-Type: application/json" \
//   -d '{"username":"testuser","password":"123456"}'