const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send("entrei no index")
})

app.listen(3000, () => {
  console.log("rodando");
})