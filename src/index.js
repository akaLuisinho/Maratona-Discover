const express = require('express')
const server = express()
const routes = require('./routes')

server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))

server.set('view engine', 'ejs')

server.use(routes)

server.listen(3300, () => {
  console.log('rodando')
})
