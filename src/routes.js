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
    created_at: Date.now(),
    remaining: 5,
    status: 'progress'
  },
  {
    id: 2,
    name: 'One Two Project',
    'daily-hours': 3,
    'total-hours': 47,
    created_at: Date.now(),
    remaining: 0,
    status: 0,
  }
]

function remainingTime(job) {
  const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

  const createdDate = new Date(job.created_at)
  const dueDay = 0 + Number(remainingDays)
  const dueDateinMs = createdDate.setDate(dueDay)

  const timeDiffinMS = dueDateinMs - Date.now()

  const dayInMS = 1000 * 60 * 60 * 24

  const dayDiff = (timeDiffinMS / dayInMS).toFixed()

  return dayDiff > 0 ? dayDiff : 0
}
routes.get('/', (req, res) => {
  const updatedJobs = jobs.map((job) => {
    const remaining = remainingTime(job)
    const status = remaining == 0 ? 'done' : 'progress'
    console.log(status)
    return {
      ...job,
      remaining,
      status,
      budget: profile['value-hour'] * job['total-hours']
    }
  })
  return res.render(views + '/index', { jobs: updatedJobs })
})



routes.get('/job', (req, res) => res.render(views + '/job'))
routes.post('/job', (req, res) => {

  const lastId = jobs[jobs.length - 1]?.id || 1

  jobs.push({
    id: lastId + 1,
    name: req.body.name,
    'daily-hours': req.body['daily-hours'],
    'total-hours': req.body['total-hours'],
    created_at: Date.now
  })
  return res.redirect('/index')
})
routes.get('/job/edit', (req, res) => res.render(views + '/job-edit'))
routes.get('/profile', (req, res) => res.render(views + '/profile', { profile: profile }))

module.exports = routes