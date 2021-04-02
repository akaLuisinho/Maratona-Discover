const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const profile = {
  name: 'Luís',
  avatar: 'guthub.com/akaLuisinho.png',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4,
  'value-hour': 75

}

const jobs = [
  {
    id: 1,
    name: 'Pizzaria Guloso',
    'daily-hours': 2,
    'total-hours': 60,
    created_at: Date.now()
  },
  {
    id: 2,
    name: 'One Two Project',
    'daily-hours': 3,
    'total-hours': 47,
    created_at: Date.now()
  }
]

function remainingDays(job) {
  const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
  const createdDate = new Date(job.created_at)
  const dueDay = createdDate.getDate() + Number(remainingDays)
  const dueDateInMs = createdDate.setDate(dueDay)

  const timeDiffInMS = dueDateInMs - Date.now()
  const dayInMs = 1000 * 60 * 60 * 24
  const dayDiff = Math.floor(timeDiffInMS / dayInMs)

  return dayDiff
}

routes.get('/', (req, res) => {
  const upatatedJobs = jobs.map((job) => {
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'
    const budget = profile['value-hour'] * job['total-hours']
    console.log(remaining)
    return {
      ...job,
      remaining,
      status,
      budget
    }
  })
  return res.render(views + '/index', { upatatedJobs })
})



routes.get('/job', (req, res) => res.render(views + '/job'))
routes.post('/job', (req, res) => {

  const lastId = jobs[jobs.length - 1]?.id || 1

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now()
  })
  return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + '/job-edit'))
routes.get('/profile', (req, res) => res.render(views + '/profile', { profile: profile }))

module.exports = routes