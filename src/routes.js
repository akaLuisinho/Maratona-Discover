const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {
  data: {
    name: 'Luís',
    avatar: 'https://avatars.githubusercontent.com/u/75910800?v=4',
    "monthly-budget": 3000,
    "days-per-week": 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'value-hour': 75
  },
  controllers: {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data })
    },
    update(req, res) {
      const data = req.body

      const weeksPerYear = 52
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

      //total de horas na semana
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']
      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      const valueHour = data['monthly-budget'] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        'value-hour': valueHour
      }
      return res.redirect('/profile')
    }
  }
}

const Jobs = {
  data: [
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
  ],
  controllers: {
    index(req, res) {
      const upatatedJobs = Jobs.data.map((job) => {
        const remaining = Jobs.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        const budget = Profile.data['value-hour'] * job['total-hours']
        return {
          ...job,
          remaining,
          status,
          budget
        }
      })
      return res.render(views + '/index', { upatatedJobs })
    },
    createJob(req, res) {
      const lastId = Jobs.data[Jobs.data.length - 1]?.id || 1

      Jobs.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now()
      })
      return res.redirect('/')
    }
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)

      const timeDiffInMS = dueDateInMs - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMS / dayInMs)

      return dayDiff
    }
  }
}

routes.get('/', Jobs.controllers.index)
routes.get('/job', (req, res) => res.render(views + '/job'))
routes.post('/job', Jobs.controllers.createJob)
routes.get('/job/edit', (req, res) => res.render(views + '/job-edit'))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes