const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const profile = {
  name: 'Luís',
  avatar: 'https://avatars.githubusercontent.com/u/75910800?s=400&u=1b09878c3191682b9da018b3ec350490dde41151&v=4',
  'monthly-budget' : 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4
}

routes.get('/index', (req, res) => res.render(views +'/index'))
routes.get('/job', (req, res) => res.render(views + '/job'))
routes.get('/job/edit', (req, res) => res.render(views + '/job-edit'))
routes.get('/profile', (req, res) => res.render(views + '/profile', { profile: profile}))

module.exports = routes 