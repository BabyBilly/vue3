const express = require('express')
const app = express()
const port = 3001

// 你的模拟数据
const data = {
  "code": "1",
  "msg": "操作成功",
  "result": [
      {
        "id": "1009000",
        "name": "居家"
      }
      ]
}


// 返回分类数据的接口
app.get('/api/categories', (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`服务已启动: http://localhost:${port}`)
})